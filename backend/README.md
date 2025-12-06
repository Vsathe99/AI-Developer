# AI Developer Platform

This project is a collaborative AI-powered development platform built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create and manage projects, collaborate with team members, and leverage AI to assist in development tasks.

## Features

- **User Authentication**: Register, login, and manage user sessions.
- **Project Management**: Create, view, and manage projects.
- **Collaboration**: Add collaborators to projects.
- **AI Assistance**: Use AI to generate code snippets and suggestions.
- **Real-time Communication**: Chat with collaborators in real-time.
- **Code Execution**: Run and test code directly in the browser using WebContainer.

## Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express, MongoDB
- **AI Integration**: Google Generative AI
- **Real-time Communication**: Socket.IO
- **Code Execution**: WebContainer API

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Redis

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd AI-Developer
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   - Update the `.env` files in both `frontend` and `backend` directories with your configuration.

4. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

5. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

6. Open the application in your browser at `http://localhost:5173`.

## Project Structure

```
AI-Developer/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── auth/
│   │   ├── config/
│   │   ├── context/
│   │   ├── routes/
│   │   ├── screens/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── vite.config.js
│   ├── index.html
│   └── package.json
└── README.md
```

## License

This project is licensed under the MIT License.
