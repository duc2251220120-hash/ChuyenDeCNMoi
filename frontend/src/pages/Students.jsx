import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentForm from '../components/StudentForm';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/students`);
      setStudents(res.data.data || []);
    } catch {
      showAlert('Không thể tải danh sách sinh viên', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const showAlert = (msg, type = 'success') => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAdd = async (data) => {
    try {
      await axios.post(`${API_URL}/api/students`, data);
      showAlert('✅ Thêm sinh viên thành công!');
      fetchStudents();
    } catch (err) {
      const msg = err.response?.data?.message || 'Lỗi khi thêm sinh viên';
      showAlert(`❌ ${msg}`, 'error');
    }
  };

  return (
    <div className="container">
      {alert && (
        <div className={`alert alert-${alert.type === 'error' ? 'error' : 'success'}`}>
          {alert.msg}
        </div>
      )}

      <div className="card">
        <h2>➕ Thêm Sinh Viên</h2>
        <StudentForm onSubmit={handleAdd} />
      </div>

      <div className="card">
        <h2>📋 Danh Sách Sinh Viên</h2>
        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : students.length === 0 ? (
          <p style={{ color: '#888', marginTop: '1rem' }}>Chưa có sinh viên nào. Hãy thêm mới!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Họ và tên</th>
                <th>MSSV</th>
                <th>Lớp</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.studentId}</td>
                  <td>{s.class}</td>
                  <td>{s.email || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentsPage;
