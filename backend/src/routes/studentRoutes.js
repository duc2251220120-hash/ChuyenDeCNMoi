const express = require('express');
const router = express.Router();
const { getStudents, createStudent, updateStudent } = require('../controllers/studentController');

// GET /api/students
router.get('/', getStudents);

// POST /api/students
router.post('/', createStudent);

// PUT /api/students/:id
router.put('/:id', updateStudent);

module.exports = router;
