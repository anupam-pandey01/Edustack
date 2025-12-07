# EduStack – Learning Management System (LMS)

EduStack is a full-featured Learning Management System designed to help educators create, manage, and deliver courses efficiently. It includes features for course creation, chapters, lessons, secure authentication, user dashboards, and content editing using a rich text editor. Built with a modern MERN stack architecture, EduStack is fast, scalable, and production-ready.

<p align="center">
  <img src="docs/lms (2).png" width="800" />
</p>
---

## 🚀 Features

### 👨‍🏫 Instructor / Admin
- Create, update, and publish courses  
- Add chapters and lessons  
- Rich-text lesson editor (Jodit)  
- Upload thumbnails and supporting material  
- Manage enrolled students  

### 🎓 Student
- Browse and access courses  
- Track progress  
- View lessons with multimedia content  
- Smooth and responsive UI  

### 🔐 Authentication
- JWT-based login and signup  
- Role-based permission control  

### ⚙️ Additional Features
- Clean and modular folder structure  
- Protected routes (Frontend & Backend)  
- MongoDB models for courses, chapters, lessons, users  
- Fully responsive modern UI  

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- React Router  
- Jodit Editor    
- Context API   

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Cloudinary (optional for file uploads)  

---


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_GITHUB/EduStack.git
cd EduStack

# Add MongoDB URI, JWT_SECRET, CLOUDINARY details
```bash
cd server
npm install
cp .env.example
npm run dev

# Add REACT_APP_API_URL=http://localhost:5000/api
```bash
cd client
npm install
cp .env.example
npm run dev