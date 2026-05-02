# Employee/Faculty Attendance API

## 1) Install and run

```bash
npm install
npm run dev
```

## 2) API Base URL

`http://localhost:5000`

## 3) Endpoints

### Register Faculty (for testing)

- `POST /api/faculty/register`

```json
{
  "grId": "FAC001",
  "name": "John Doe",
  "email": "john@college.com",
  "password": "123456"
}
```

### Faculty Login

- `POST /api/faculty/login`

```json
{
  "email": "john@college.com",
  "password": "123456"
}
```

Copy the returned `token`.

### Mark Today Attendance (Protected)

- `POST /api/attendance/mark-today`
- Header: `Authorization: Bearer <token>`

### Get Today Attendance (Protected)

- `GET /api/attendance/today`
- Header: `Authorization: Bearer <token>`

### Get Attendance By Date (Protected)

- `GET /api/attendance/by-date?date=2026-05-02`
- Header: `Authorization: Bearer <token>`

Date format must be `YYYY-MM-DD`.
