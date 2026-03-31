import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AboutPage() {
  const [info, setInfo] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/about`).then((r) => setInfo(r.data)),
      axios.get(`${API_URL}/health`).then((r) => setHealth(r.data)),
    ])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container"><div className="loading">Đang tải...</div></div>;

  return (
    <div className="container">
      <div className="card">
        <h2>👤 Thông Tin Sinh Viên</h2>
        <div className="about-profile">
          <div className="about-avatar">👨‍🎓</div>
          <div className="about-info">
            {info ? (
              <table>
                <tbody>
                  <tr><td>Họ và tên:</td><td><strong>{info.student?.name}</strong></td></tr>
                  <tr><td>MSSV:</td><td>{info.student?.studentId}</td></tr>
                  <tr><td>Lớp:</td><td>{info.student?.class}</td></tr>
                  <tr><td>Email:</td><td>{info.student?.email}</td></tr>
                  <tr><td>Ứng dụng:</td><td>{info.appName}</td></tr>
                  <tr><td>Mô tả:</td><td>{info.description}</td></tr>
                </tbody>
              </table>
            ) : (
              <p style={{ color: '#888' }}>Không thể kết nối tới backend.</p>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2>❤️ Health Check</h2>
        <p style={{ marginBottom: '1rem' }}>
          Endpoint: <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>GET /health</code>
        </p>
        {health ? (
          <div className="health-badge">
            <span className="dot"></span>
            status: {health.status}
          </div>
        ) : (
          <p style={{ color: '#e53935' }}>❌ Backend không phản hồi</p>
        )}
      </div>
    </div>
  );
}

export default AboutPage;
