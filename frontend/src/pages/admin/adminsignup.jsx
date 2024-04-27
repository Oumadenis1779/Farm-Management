import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../../MyComponent.css'; // importation style 

function AdmSignUp() {
  // Using useState hook to manage state variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is worker

  const navigate = useNavigate();
  const handleSignUp = () => {
    // Construct the request body
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      role: role
    };

    // Send a POST request to the backend
    fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      return response.json();
    })
    .then(data => {
      console.log('Signup successful:', data); 
      navigate('/adminlogin'); // Redirect to the login page on successful signup  
      // Optionally, redirect user to another page after successful signup
      // history.push('/dashboard');
    })
    .catch(error => {
      console.error('Error signing up:', error);
      // Handle errors, e.g., display an error message to the user
    });
  };

  return (

    <div>
      {/* Logo au-dessus du formulaire de connexion */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link to="/" className="navbar-brand">
          <img src="https://i.ibb.co/NTtQKqZ/logo.png" alt="logo" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        </Link>
      </div>

      {/* Contenu de Login */}

    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Sign Up</h1>
          <form className="custom-form">
            {/* Form fields for user input */}
            <div className="form-group second-form-group1">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group second-form-group1">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group second-form-group1">
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
            <div className="form-group second-form-group1">
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
            {/* Dropdown for selecting user role */}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="worker">User</option>
                {/* <option value="admin">Admin</option> */}
              </select>
            </div>
            {/* Sign Up button */}
            <div className="form-group d-flex justify-content-center mt-3">
              <button
                type="button"
                className="btn btn-success btn-block custom-login-button text-white" // Applying custom styles
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </form>
          {/* Link to navigate to sign in page */}
          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AdmSignUp;