require('dotenv').config();
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const APP_NAME = process.env.APP_NAME || 'DevOps App';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// About endpoint - thông tin sinh viên
app.get('/about', (req, res) => {
  res.json({
    appName: APP_NAME,
    student: {
      name: 'Nguyễn Văn A',
      studentId: '2251220120',
      class: 'DCCTCT66A1',
      email: 'duc2251220120@caothang.edu.vn',
    },
    version: '1.0.0',
    description: 'Ứng dụng DevOps - Backend Node.js/Express + MySQL',
  });
});

// API routes
app.use('/api/students', studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`${APP_NAME} đang chạy tại cổng ${PORT}`);
});

module.exports = app;
