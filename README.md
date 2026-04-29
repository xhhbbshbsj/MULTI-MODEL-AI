# Core Engine - Autonomous Multi-Modal Problem Solver

A powerful, multi-modal AI interface built to process text, image, and document inputs to solve complex problems. The application uses a React/Vite frontend with a stunning parallax terminal UI and an Express/Node.js backend powered by Google's Generative AI (Gemini) and MongoDB.

## 🚀 Features

- **Multi-Modal Inputs**: Upload images, text files, code files (`.js`, `.json`, `.csv`), or type direct prompts.
- **Terminal-Like UI**: A sleek, high-fidelity parallax interface with dynamic log state management.
- **Google Generative AI**: Powered by Gemini API to process and analyze diverse forms of data.
- **Session Memory**: Backend handles session persistence for continuous conversations using MongoDB.
- **Dynamic Animations**: Smooth UI transitions and interactions using Framer Motion and React Scroll Parallax.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite** (Build Tool & Dev Server)
- **Tailwind CSS 4** (Styling)
- **Framer Motion** (Animations)
- **React Scroll Parallax** (Background effects)
- **Lucide React** (Icons)
- **Axios** (HTTP Client)

### Backend
- **Node.js & Express 5**
- **MongoDB & Mongoose** (Database & Schemas)
- **Google Generative AI SDK** (Gemini Integration)
- **Multer** (File Uploads)
- **Helmet & CORS** (Security)

---

## 📂 Project Structure

```
multi-modal-engine/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route controllers (e.g., aiController)
│   │   ├── models/        # Mongoose database schemas (e.g., Chat.js)
│   │   ├── routes/        # Express API routes
│   │   ├── services/      # Business logic and AI integrations (e.g., textService.js)
│   │   └── app.js         # Entry point for the backend
│   ├── .env               # Backend environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React Component & UI Logic
│   │   ├── index.css      # Tailwind & Global Styles
│   │   └── main.jsx       # React DOM entry point
│   └── package.json
│
└── .gitignore             # Root git ignore file
```

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)
- A [Google Gemini API Key](https://aistudio.google.com/)

---

## 💻 Installation & Setup

1. **Clone the repository** (if applicable):
   ```bash
   git clone <your-repo-url>
   cd multi-modal-engine
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

---

## 🔑 Environment Variables

You need to set up environment variables for the backend. 
Navigate to the `backend/` directory and create or update the `.env` file:

```env
# Server Config
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/multi-modal-engine  # Or your Atlas connection string

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## ▶️ Running the Application

### 1. Start the Backend Server
Open a terminal, navigate to the `backend` folder, and run:
```bash
cd backend
npm run dev
```
*The backend should now be running on `http://localhost:5000`.*

### 2. Start the Frontend Development Server
Open a **new** terminal, navigate to the `frontend` folder, and run:
```bash
cd frontend
npm run dev
```
*Vite will start the frontend, typically accessible at `http://localhost:5173`.*

---

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📝 License

This project is licensed under the ISC License.
