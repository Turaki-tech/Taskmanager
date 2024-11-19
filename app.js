const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./authMiddleware');
require('dotenv').config();

const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

module.exports = app;