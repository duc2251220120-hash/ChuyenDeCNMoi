CREATE DATABASE IF NOT EXISTS devops_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE devops_db;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    studentId VARCHAR(20) NOT NULL UNIQUE,
    class VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dữ liệu mẫu
INSERT INTO students (name, studentId, class, email) VALUES
('Nguyễn Huy Đức', '2251220120', 'DCCTCT66A1', 'duc2251220120@dau.edu.vn'),
('Trần Thị B', '2251220001', 'DCCTCT66A1', 'b2251220001@caothang.edu.vn'),
('Lê Văn C', '2251220002', 'DCCTCT66A2', 'c2251220002@caothang.edu.vn');
