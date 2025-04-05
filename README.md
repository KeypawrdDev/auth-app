
# 🔐 Nooriam Auth App

A full-stack authentication system with real-time notifications built using:

- 🐍 **FastAPI** (backend)
- ⚛️ **React + TypeScript** (frontend)
- 🧠 **JWT Auth** (with password hashing)
- 🔔 **WebSocket**-based notifications
- 🐳 Docker-ready setup

---

## 🚀 Features

- ✅ User registration and login
- ✅ Password hashing with `passlib`
- ✅ JWT token authentication (access tokens)
- ✅ Protected backend route (`/welcome`)
- ✅ Frontend route guarding
- ✅ Token auto-attach using Axios interceptors
- ✅ Real-time WebSocket notification on user signup
- ✅ Toast notification display in frontend
- ✅ Clean, styled forms with basic UX

---

## 🧱 Tech Stack

| Frontend                 | Backend                  |
|--------------------------|---------------------------|
| React + TypeScript       | FastAPI (Python)          |
| Axios with interceptors  | SQLAlchemy (SQLite or Postgres) |
| React Router             | Pydantic + JWT + bcrypt   |
| Toast notifications      | WebSocket endpoint `/ws/notifications` |

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/nooriam-auth-app.git
cd nooriam-auth-app
```

---

### 2. Backend Setup (FastAPI)

```bash
cd auth-app/backend
python -m venv venv
venv\Scripts\activate        # On Windows
# source venv/bin/activate  # On macOS/Linux

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

### 3. Frontend Setup (React)

```bash
cd auth-app/frontend
npm install
npm start
```

Runs on [http://localhost:3000](http://localhost:3000)

---

## 🌐 API Endpoints (FastAPI)

| Method | Route         | Description            |
|--------|---------------|------------------------|
| POST   | `/register`   | Register a new user    |
| POST   | `/login`      | Get access token       |
| GET    | `/welcome`    | Protected route        |
| WS     | `/ws/notifications` | WebSocket connection for toast notifications |

---

## 🔐 Authentication Flow

- Passwords are hashed with `bcrypt`
- JWTs include email (`sub`) and expiration (`exp`)
- Tokens are stored in `localStorage`
- Axios interceptors inject `Authorization: Bearer <token>`
- 401 responses automatically trigger logout

---

## 🔔 Real-Time Notifications

- When a user registers, backend broadcasts over WebSocket
- Frontend listens and displays a styled toast
- Socket auto-connects on page load

---

## 🧪 Optional Enhancements

- [ ] Refresh token & access token strategy
- [ ] Secure cookies instead of localStorage
- [ ] Role-based access (admin, user)
- [ ] Docker + deployment (Fly.io, Render, etc.)

---

## 🧠 Folder Structure

```
auth-app/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   ├── database.py
│   │   └── websocket.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   └── Welcome.tsx
    │   ├── hooks/useNotifications.ts
    │   ├── utils/axios.ts
    │   ├── components/Toast.tsx
    │   └── App.tsx
```


