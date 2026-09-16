
# ✨ Keeper — Smart Task Management

<p align="center">
  <b>Organize your tasks. Manage your deadlines. Stay on track.</b>
</p>

Keeper is a full-stack task management application designed to help users organize daily tasks, manage deadlines, and track their progress through an interactive interface.

---

## 🚀 Features

- 🔐 **JWT Authentication** — User signup and login using JSON Web Tokens.
- 📝 **Task Management** — Create, complete, and delete tasks.
- ⏳ **Deadline Tracking** — Set deadlines and monitor remaining time with a live countdown.
- 📊 **Task Status Tracking** — Track pending, completed, and failed tasks.
- 📅 **Daily Organization** — Tasks grouped by date with collapsible sections.
- 🌗 **Dark & Light Mode** — Switch between themes.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend interface |
| JavaScript | Application logic |
| CSS | Styling |
| Vite | Development server and build tool |
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| JWT | Authentication |

---

## 📂 Repositories

| Repository | Description |
|---|---|
| [Keeper Frontend](https://github.com/yuv3048/frontend_todo) | React.js application |
| [Keeper Backend](https://github.com/yuv3048/backend_todo) | Node.js and Express.js API |

---

## ⚙️ Getting Started

Follow these steps to run Keeper locally.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### 1. Clone the Frontend

```bash
git clone https://github.com/yuv3048/frontend_todo.git
cd frontend_todo
npm install
```

### 2. Clone the Backend

Open a separate terminal:

```bash
git clone https://github.com/yuv3048/backend_todo.git
cd backend_todo
npm install
```

### 3. Start the Backend

```bash
npm start
```

The backend server runs at:

**http://localhost:3000**

### 4. Start the Frontend

In the frontend terminal, run:

```bash
npm run dev
```

Vite will display the local development URL in your terminal. Open that URL in your browser to access Keeper.

> **Important:** Keep both the frontend and backend servers running simultaneously. The frontend connects to the backend at `http://localhost:3000`.

---

## 📁 Project Structure

### Frontend

```text
frontend_todo/
├── public/
├── src/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

### Backend

```text
backend_todo/
├── src/
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔮 Future Improvements

- Task priorities and advanced filtering.
- Notifications for upcoming deadlines.
- Productivity analytics and insights.

---

## 👨‍💻 Author

**Yuvraj Sharma**

B.Tech — Artificial Intelligence & Machine Learning

---

<p align="center">
  Made with ❤️ to simplify everyday task management.
</p>
