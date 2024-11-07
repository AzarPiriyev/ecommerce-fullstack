import React, { useState, useEffect } from 'react';
import Container from '../common/container';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in when the page reloads
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/'); // Redirect to homepage if user is already logged in
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', { 
        email, 
        password 
      });

      const { token, user } = response.data;

      if (token) {
        // Save user and token to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Clear any previous error
        setError('');

        // Reload the page to reflect login status
        window.location.reload(); // This will trigger the useEffect and redirect
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred while trying to log in');
    }
  };

  return (
    <Container>
      <div className="max-w-[400px] mx-auto mb-10 p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-[24px] text-[#2f2f2f] font-semibold mb-6 text-center">Log In</h1>
        <div className="flex flex-col space-y-4">
          <input 
            type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5100]" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5100]" 
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button 
            onClick={handleLogin}
            className="bg-[#ff5100] text-white py-3 rounded-md font-semibold text-center hover:bg-[#e04500] transition duration-200"
          >
            Log In
          </button>
          <p className='text-[15px] font-normal text-[#333333] text-center'>
            New User? <Link to={'/signup'}><span className='font-medium'>Register</span></Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
