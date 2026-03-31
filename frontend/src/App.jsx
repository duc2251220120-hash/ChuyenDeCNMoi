import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AboutPage from './pages/About';
import StudentsPage from './pages/Students';

function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/" className="logo">🚀 DevOps App</NavLink>
        <ul>
          <li><NavLink to="/" end>Trang chủ</NavLink></li>
          <li><NavLink to="/about">Giới thiệu</NavLink></li>
          <li><NavLink to="/students">Sinh viên</NavLink></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/students" element={<StudentsPage />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="container">
      <div className="card">
        <h2>🏠 Trang Chủ</h2>
        <p>Chào mừng đến với <strong>DevOps App</strong> — Dự án thực hành môn Chuyên Đề Công Nghệ Mới.</p>
        <br />
        <p>Ứng dụng gồm:</p>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li>✅ Backend: Node.js / Express</li>
          <li>✅ Frontend: React</li>
          <li>✅ Database: MySQL</li>
          <li>✅ Docker + Docker Compose</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
