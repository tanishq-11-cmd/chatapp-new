const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ["https://chatapp-frontend.onrender.com", "https://your-custom-domain.com"]
      : "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Store connected users and messages
const users = new Map();
const messages = [];

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle user joining
  socket.on('join', (userData) => {
    const user = {
      id: socket.id,
      username: userData.username,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
      joinedAt: new Date()
    };
    
    users.set(socket.id, user);
    
    // Send current users and messages to the new user
    socket.emit('userJoined', {
      user,
      users: Array.from(users.values()),
      messages: messages.slice(-50) // Send last 50 messages
    });
    
    // Notify other users
    socket.broadcast.emit('userJoined', { user });
    
    console.log(`${user.username} joined the chat`);
  });

  // Handle new message
  socket.on('sendMessage', (messageData) => {
    const user = users.get(socket.id);
    if (!user) return;

    const message = {
      id: uuidv4(),
      text: messageData.text,
      userId: socket.id,
      username: user.username,
      avatar: user.avatar,
      timestamp: new Date()
    };

    messages.push(message);
    
    // Broadcast message to all users
    io.emit('newMessage', message);
    
    console.log(`Message from ${user.username}: ${messageData.text}`);
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    const user = users.get(socket.id);
    if (!user) return;
    
    socket.broadcast.emit('userTyping', {
      userId: socket.id,
      username: user.username,
      isTyping
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      io.emit('userLeft', { userId: socket.id, username: user.username });
      console.log(`${user.username} left the chat`);
    }
  });
});

// API Routes
app.get('/api/users', (req, res) => {
  res.json(Array.from(users.values()));
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 