import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/register', { username, email, password });

      if (res.data.token) {
        login(res.data.token);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
