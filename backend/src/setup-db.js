require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mysql = require('mysql2/promise');

async function setupDB() {
  // Kết nối không chỉ định database trước
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  console.log('✅ Kết nối MySQL thành công!');

  await conn.query(`CREATE DATABASE IF NOT EXISTS devops_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  console.log('✅ Database devops_db đã sẵn sàng');

  await conn.query(`USE devops_db`);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      studentId VARCHAR(20) NOT NULL UNIQUE,
      class VARCHAR(50) NOT NULL,
      email VARCHAR(100),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Table students đã sẵn sàng');

  // Insert dữ liệu mẫu (bỏ qua nếu đã tồn tại)
  const students = [
    ['Nguyễn Huy Đức', '2251220120', 'DCCTCT66A1', 'duc2251220120@dau.edu.vn'],
    ['Trần Thị B',     '2251220001', 'DCCTCT66A1', 'b2251220001@dau.edu.vn'],
    ['Lê Văn C',       '2251220002', 'DCCTCT66A2', 'c2251220002@dau.edu.vn'],
  ];
  for (const [name, studentId, cls, email] of students) {
    await conn.query(
      `INSERT IGNORE INTO students (name, studentId, class, email) VALUES (?, ?, ?, ?)`,
      [name, studentId, cls, email]
    );
  }
  console.log('✅ Dữ liệu mẫu đã được thêm');

  const [rows] = await conn.query('SELECT * FROM students');
  console.log('\n📋 Danh sách sinh viên:');
  console.table(rows);

  await conn.end();
  console.log('\n🎉 Setup hoàn tất! Restart backend để kết nối DB.');
}

setupDB().catch(err => {
  console.error('❌ Lỗi:', err.message);
  process.exit(1);
});
