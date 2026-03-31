# 🚀 DevOps App - Chuyên Đề Công Nghệ Mới

Ứng dụng thực hành DevOps với Backend Node.js/Express, Frontend React và MySQL Database.

## 📋 Thông Tin Sinh Viên

| Họ tên | MSSV | Lớp |
|--------|------|-----|
| Nguyễn Văn A | 2251220120 | DCCTCT66A1 |

## 🏗️ Cấu Trúc Dự Án

```
ChuyenDeCNMoi/
├── backend/            # Node.js / Express API
│   ├── src/
│   │   ├── server.js
│   │   ├── config/db.js
│   │   ├── routes/
│   │   └── controllers/
│   ├── Dockerfile
│   └── package.json
├── frontend/           # React SPA
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   └── components/
│   ├── Dockerfile
│   └── package.json
├── database/           # MySQL
│   ├── init.sql
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔧 Yêu Cầu

- [Docker](https://docs.docker.com/get-docker/) >= 20.x
- [Docker Compose](https://docs.docker.com/compose/) >= 2.x

## 🚀 Chạy Với Docker Compose

```bash
# 1. Sao chép file .env
cp .env.example .env

# 2. Khởi động toàn bộ hệ thống
docker-compose up --build -d

# 3. Kiểm tra trạng thái
docker-compose ps
```

Sau khi khởi động:

| Dịch vụ | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |
| About | http://localhost:5000/about |

## 📡 API Endpoints

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/health` | Kiểm tra trạng thái server |
| GET | `/about` | Thông tin sinh viên & ứng dụng |
| GET | `/api/students` | Lấy danh sách sinh viên |
| POST | `/api/students` | Thêm sinh viên mới |
| PUT | `/api/students/:id` | Cập nhật sinh viên |

### Ví dụ

```bash
# Health check
curl http://localhost:5000/health
# {"status":"ok"}

# Lấy danh sách sinh viên
curl http://localhost:5000/api/students

# Thêm sinh viên
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Nguyễn Văn D","studentId":"2251220099","class":"DCCTCT66A1","email":"d@caothang.edu.vn"}'
```

## 🛠️ Chạy Locally (Development)

### Backend

```bash
cd backend
cp .env.example .env  # Chỉnh sửa các giá trị
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

## 🗃️ Database Schema

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    studentId VARCHAR(20) NOT NULL UNIQUE,
    class VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌿 Git Branches

- `main` — nhánh chính, production-ready
- `develop` — nhánh phát triển
- `feature/devops-template` — nhánh tính năng

## 🐳 Docker Hub

- Backend image: `<your-dockerhub-username>/devops-backend:latest`
- Frontend image: `<your-dockerhub-username>/devops-frontend:latest`

## 📄 Environment Variables

Xem file `.env.example` để biết danh sách biến cần thiết.
