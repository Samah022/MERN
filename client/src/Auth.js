import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
import Info from './Info';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';

const Auth = () => {
  const [cookies, setCookies] = useCookies(['access_token']); // Initialize access_token cookie
  const [registered, setRegistered] = useState(false); // State variable to keep track of whether user is registered

  /**
   * Remove access_token cookie and adminID from local storage, then reload the page
   */
  const removeCookies = () => {
    setCookies('access_token', '');
    window.localStorage.removeItem('adminID');
    window.location.reload(false);
  };

  /**
   * Set registered state variable to true to switch to Login component
   */
  const handleRegister = () => {
    setRegistered(true);
  };

  return (
    <>
      {/* Header section with navigation links */}
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Admin</a>
            </li>
            <li>
              <a href="/app">User</a>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        {cookies.access_token ? (
          <>
            <Info />
            <div className="text-center">
            <Button variant="danger" onClick={removeCookies}>
              Logout
            </Button>
            </div>
          </>
        ) : (
          <>
            {registered ? <Login /> : <Register handleRegister={handleRegister} />}
          </>
        )}
      </div>
    </>
  );
};

// Component for registering a new admin user
const Register = ({ handleRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handle form submission and send POST request to register new admin
   * @param e - Form submit event object
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    await Axios.post('http://localhost:3001/register', { username, password }); // Send POST request to register new admin
    alert('Admin Created');
    handleRegister(); // Call handleRegister function to switch to Login component
  };

  return (
    <Container>
      <Form className="form" onSubmit={onSubmit}>
        <h2 className="text-white">Register</h2>
        <div className="form-group">
          <Form.Control
            type="text"
            id="username"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
          <br></br>
          <Form.Control
            type="password"
            id="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <br></br>
          <Button variant="success" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </Container>
  );
};

// Component for logging in as an admin user
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [_, setCookies] = useCookies(['access_token']); // Initialize access_token cookie

  /**
   * Handle form submission and send POST request to login as admin
   * @param e - Form submit event object
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.post('http://localhost:3001/login', { username, password }); // Send POST request to login as admin
    setCookies('access_token', response.data.token); // Set access_token cookie
    window.localStorage.setItem('adminID', response.data.AdminID); // Set adminID in local storage
    window.location.reload(false); // Reload the page
  };

  return (
    <Container>
      <Form className="form" onSubmit={onSubmit}>
        <h2 className="text-white">Login</h2>
        <div className="form-group">
          <Form.Control
            type="text"
            id="username"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>

          <br></br>
          <Form.Control
            type="password"
            id="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <br></br>
          <Button variant="success" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Auth;

