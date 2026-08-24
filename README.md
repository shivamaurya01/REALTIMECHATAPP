# 💬 TalkSync — Real-Time Chat Application

TalkSync is a **full-stack real-time chat application** built with the MERN stack and Socket.IO. I created this project to understand how modern messaging applications handle **real-time communication, authentication, online presence, and message updates**.

The project focuses on building a practical, responsive chat experience while learning how frontend and backend systems communicate in real time.

## 🚀 Live Demo

**[TalkSync — Live Demo](https://talksync-pf5r.onrender.com/)**

## 📂 GitHub Repository

**[GitHub — REALTIMECHATAPP](https://github.com/shivamaurya01/REALTIMECHATAPP)**

---

## ✨ Features

* 🔐 User authentication and authorization
* 💬 Real-time one-to-one messaging
* ⚡ Instant message delivery using Socket.IO
* 🟢 Online/offline user status
* 🔎 Search users
* 👤 User profile management
* 🖼️ Profile image upload using Cloudinary
* 📱 Responsive chat interface
* 🔒 JWT-based authentication
* 🍪 Cookie-based session handling
* 🗄️ MongoDB database integration
* 🔄 Real-time frontend state management with Redux

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Tailwind CSS
* Redux
* Axios

### Backend

* Node.js
* Express.js
* Socket.IO
* JWT
* REST APIs

### Database & Storage

* MongoDB
* Mongoose
* Cloudinary

### Tools

* Git
* GitHub
* VS Code
* Render

---

## 🏗️ Project Architecture

```text
REALTIMECHATAPP
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── socket/
│   ├── config/
│   └── index.js
│
└── README.md
```

---

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/shivamaurya01/REALTIMECHATAPP.git
```

### 2. Navigate to the project

```bash
cd REALTIMECHATAPP
```

### 3. Install dependencies

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd ../backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Make sure you **never commit your `.env` file** to GitHub.

---

## ▶️ Run the Application

### Start the backend

```bash
cd backend
npm run dev
```

The backend will run on:

```text
http://localhost:8000
```

### Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## 🔄 How Real-Time Messaging Works

TalkSync uses **Socket.IO** to establish a persistent connection between the client and server.

The basic flow is:

```text
User A
   │
   │ Sends Message
   ▼
React Frontend
   │
   │ Socket.IO
   ▼
Node.js + Express Server
   │
   │ Store Message
   ▼
MongoDB
   │
   │ Socket.IO Event
   ▼
User B's Browser
   │
   ▼
Message Appears Instantly
```

This allows messages to appear without manually refreshing the page.

---

## 🔐 Authentication Flow

TalkSync uses JWT-based authentication.

```text
User Login
    ↓
Backend validates credentials
    ↓
JWT Token generated
    ↓
Token stored in cookie
    ↓
Authenticated requests
    ↓
Backend verifies JWT
    ↓
Protected resources accessed
```

Protected routes use authentication middleware to verify the user's identity.

---

## 📸 Main Functional Areas

### Authentication

Users can:

* Sign up
* Log in
* Log out
* Stay authenticated using cookies

### Messaging

Users can:

* Search for other users
* Select a user
* Send messages
* Receive messages instantly
* View conversation history

### User Presence

Socket.IO is used to track whether users are:

* 🟢 Online
* ⚫ Offline

### Profile Management

Users can update their profile information and upload profile images through Cloudinary.

---

## 🧠 What I Learned

This project was initially started out of curiosity about how real-time messaging applications work.

While building TalkSync, I learned:

* How WebSockets and Socket.IO work
* How to build REST APIs with Express
* JWT authentication and cookies
* MongoDB data modeling with Mongoose
* React state management with Redux
* Frontend-backend integration
* Handling CORS and credentials
* Cloudinary image uploads
* Debugging authentication and database issues
* Deploying full-stack applications
* Structuring a scalable MERN application

The most valuable lesson was learning how to **debug real-world problems independently**. Issues such as CORS configuration, expired JWT tokens, MongoDB authentication, and deployment errors helped me understand the complete application lifecycle beyond just writing code.

---

## 🔮 Future Improvements

Some features I plan to add:

* ✔️ Message read/delivered indicators
* 🔔 Unread message notifications
* 📎 File and media sharing
* 😊 Emoji support
* 👥 Group conversations
* 🗑️ Delete messages
* ✏️ Edit messages
* 🔍 Search conversation history
* 🌙 Dark/light theme
* 📞 Voice and video calling

---

## 👨‍💻 Author

**Shiva Maurya**

B.Tech Computer Science & Engineering

Interested in **Full-Stack Development, Java, DSA, React.js, Node.js, and Software Engineering**.

### Connect With Me

* **GitHub:** https://github.com/shivamaurya01
* **LeetCode:** https://leetcode.com/u/shivva_maurya01/

---

## ⭐ Support

If you found this project interesting, consider giving the repository a ⭐ on GitHub!
