const pool = require('../config/db');

// GET /api/students - Lấy danh sách sinh viên
const getStudents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students ORDER BY id DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

// POST /api/students - Thêm sinh viên mới
const createStudent = async (req, res) => {
  const { name, studentId, class: studentClass, email } = req.body;

  if (!name || !studentId || !studentClass) {
    return res.status(400).json({
      success: false,
      message: 'Vui lòng cung cấp đầy đủ thông tin: name, studentId, class',
    });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO students (name, studentId, class, email) VALUES (?, ?, ?, ?)',
      [name, studentId, studentClass, email || null]
    );
    const [newStudent] = await pool.query('SELECT * FROM students WHERE id = ?', [
      result.insertId,
    ]);
    res.status(201).json({ success: true, data: newStudent[0] });
  } catch (error) {
    console.error('Error creating student:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'MSSV đã tồn tại' });
    }
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

// PUT /api/students/:id - Cập nhật thông tin sinh viên
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, studentId, class: studentClass, email } = req.body;

  try {
    const [existing] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sinh viên' });
    }

    await pool.query(
      'UPDATE students SET name = ?, studentId = ?, class = ?, email = ? WHERE id = ?',
      [
        name || existing[0].name,
        studentId || existing[0].studentId,
        studentClass || existing[0].class,
        email !== undefined ? email : existing[0].email,
        id,
      ]
    );

    const [updated] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
    res.json({ success: true, data: updated[0] });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

module.exports = { getStudents, createStudent, updateStudent };
