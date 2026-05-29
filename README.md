# She Can Foundation – Community Wall 🌟

A modern full-stack **MERN** community platform where supporters, volunteers, and advocates can share messages of empowerment and encouragement.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

- **Community Message Wall** — Post and share messages of support and empowerment
- **Like System** — Engage with messages from the community
- **Auto-Generated Avatars** — Unique avatar initials for every user
- **Responsive Design** — Beautiful on mobile, tablet, and desktop
- **Real-time Feed** — Latest messages displayed first
- **Modern UI** — Glassmorphism, smooth animations, and premium design

---

## 🎨 Brand Design

| Element | Color |
|---------|-------|
| Deep Navy | `#050A30` |
| Coral Orange | `#FF5A36` |
| Warm White | `#FFF8F6` |
| Soft Peach | `#FFD6CC` |

**Typography:** Poppins (headings) · Inter (body)

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS v4
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone <repo-url>
cd sheCan
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shecan
```

> 💡 For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/messages` | Create a new message |
| `GET` | `/api/messages` | Fetch all messages |
| `PATCH` | `/api/messages/:id/like` | Like a message |

---

## 📁 Project Structure

```
sheCan/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── api/             # Axios API layer
│   │   ├── App.jsx          # Root component
│   │   └── index.css        # Global styles
│   └── package.json
│
├── server/                  # Express backend
│   ├── config/              # Database config
│   ├── models/              # Mongoose schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # Error handling
│   ├── server.js            # Entry point
│   └── package.json
│
└── README.md
```

---

## 🌐 Deployment

| Layer | Platform |
|-------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Admin dashboard
- [ ] Comment replies
- [ ] Search & filtering
- [ ] Anonymous posting
- [ ] Profanity filtering
- [ ] Real-time updates (WebSocket)
- [ ] Dark mode

---

## 📄 License

MIT License © 2026 She Can Foundation

---

<p align="center">
  Made with ❤️ for the She Can Foundation community
</p>
