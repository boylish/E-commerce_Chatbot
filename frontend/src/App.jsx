import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chatbot from './components/Chatbot/Chatbot';

const AppContent = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <Router>
      {!token ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div className="App">
          <button
            onClick={logout}
            className="bg-red-500 py-3 px-6 absolute text-white font-semibold"
          >
            Logout
          </button>
          <Chatbot />
        </div>
      )}
    </Router>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
