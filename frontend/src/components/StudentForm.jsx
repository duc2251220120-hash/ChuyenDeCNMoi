import React, { useState } from 'react';

function StudentForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', studentId: '', class: '', email: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.studentId || !form.class) return;
    onSubmit(form);
    setForm({ name: '', studentId: '', class: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Họ và tên *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            required
          />
        </div>
        <div className="form-group">
          <label>MSSV *</label>
          <input
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            placeholder="2251220001"
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Lớp *</label>
          <input
            name="class"
            value={form.class}
            onChange={handleChange}
            placeholder="DCCTCT66A1"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        ➕ Thêm Sinh Viên
      </button>
    </form>
  );
}

export default StudentForm;
