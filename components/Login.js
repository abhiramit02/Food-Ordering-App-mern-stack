import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const Login = () => {
  const [isNewUser, setIsNewUser] = useState(false); // Toggle between login and registration
  const navigate = useNavigate(); // For navigation after login

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isNewUser) {
      // Register new user
      try {
        await axios.post('http://localhost:7000/api/users/register', formData);
        alert('User registered successfully');
        setIsNewUser(false); // Redirect to login after registration
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Error registering user');
      }
    } else {
      // Log in existing user
      try {
        const response = await axios.post('http://localhost:7000/api/users/login', {
          email: formData.email,
          password: formData.password,
        });
  
        alert('User logged in successfully');
  
        // Store full user data (including isAdmin) in localStorage
        const userData = response.data;
        localStorage.setItem('user', JSON.stringify(userData));
  
        navigate('/'); // Redirect to home page after login
      } catch (error) {
        console.error('Error logging in user:', error);
        alert('Error logging in');
      }
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center">{isNewUser ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="mx-auto w-50">
        {isNewUser && (
          <>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" name="name" className="form-control" placeholder="Name" 
                     value={formData.name} onChange={handleInputChange} required />
            </div>
            
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" name="phone" className="form-control" placeholder="Phone" 
                     value={formData.phone} onChange={handleInputChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" name="address" className="form-control" placeholder="Address" 
                     value={formData.address} onChange={handleInputChange} required />
            </div>
          </>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" placeholder="Email" 
                 value={formData.email} onChange={handleInputChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" placeholder="Password" 
                 value={formData.password} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {isNewUser ? 'Register' : 'Login'}
        </button>
      </form>

      <p className="text-center mt-3" style={{ cursor: 'pointer', color: 'blue' }} 
         onClick={() => setIsNewUser(!isNewUser)}>
        {isNewUser ? 'Already have an account? Login' : 'New user? Register'}
      </p>
    </div>
  );
};

export default Login;
