import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../MyComponent.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin,] = useState(false); // State for the admin checkbox
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('Logging in...');
    setErrorMessage(''); // Clear any existing error messages
    const loginData = {
      email: email,
      password: password,
    };
    //
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
       
        // Redirect based on isAdmin state
        isAdmin ? navigate('./pages/admin/AdminDashboard') :  navigate(`/WorkerDashboard`);
      } else {
        console.error('Login failed');
        // Update the error message to inform the user
        setErrorMessage('Failed to login. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      // Update the error message for network errors
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link to="/" className="navbar-brand">
          <img src="https://i.ibb.co/NTtQKqZ/logo.png" alt="logo" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        </Link>
      </div>

      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Welcome to FarmTracker</h2>
            <form className="custom-form">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group second-form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="form-group d-flex justify-content-center mt-3">
                <button
                  type="button"
                  className="btn btn-success btn-block custom-login-button text-white"
                  onClick={handleLogin} style={{ marginRight: '60px' }}
                >
                  Login
                </button>
                <button type="button" className="btn btn-success ">
                            <Link to="/adminlogin" className="text-white">Login As Admin</Link>
                        </button>
              </div>
            </form>
            {/* Display error message if it exists */}
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <div className="text-center mt-2">
              <span>Don't have an account?</span>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;