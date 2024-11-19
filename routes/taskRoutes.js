const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const jwt = require('jsonwebtoken');

// Middleware to authenticate users
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Create a task
router.post('/', authenticate, async (req, res) => {
    try {
        const { title, description, deadline, priority } = req.body;
        const newTask = new Task({ ...req.body, userId: req.user.userId });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

// Get tasks
router.get('/', authenticate, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

module.exports = router;