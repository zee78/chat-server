const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('sequelize');
const path = require('path');
const routes = require('./routes');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
  preflightContinue: true
}));
app.use(express.json());
app.use(express.static('public'))
app.use('/', routes);
// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  // await sequelize.authenticate();
  console.log('Database connected!');
});
