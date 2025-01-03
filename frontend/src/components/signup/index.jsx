import React, { useState } from 'react';
import Container from '../common/container';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/auth/signup', { fullName, email, password });
      setError('');
      navigate('/login');
    } catch (err) {
      console.error('Error signing up:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container>
      <div className="max-w-[400px] mx-auto mb-10 p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-[24px] text-[#2f2f2f] font-semibold mb-6 text-center">Sign Up</h1>
        <div className="flex flex-col space-y-4">
          <input 
            type="text" 
            placeholder="Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5100]"
          />
          <input 
            type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5100]"
          />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5100]"
            />
            <div 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-4 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button 
            onClick={handleSignup}
            className="bg-[#ff5100] text-white py-3 rounded-md font-semibold text-center hover:bg-[#e04500] transition duration-200"
          >
            Sign Up
          </button>
          <p className='text-[15px] font-normal text-[#333333] text-center'>
            Already registered? <Link to={'/login'}><span className='font-medium'>Log In</span></Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
