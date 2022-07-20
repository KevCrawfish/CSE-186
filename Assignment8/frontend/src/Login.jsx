import React from 'react';
import {useNavigate} from 'react-router-dom';

import './Login.css';
import slug from './slug.png';

/**
 * Resources used: 14. Authenticated Book Example
 * @return {div} login div
 */
function Login() {
  const [user, setUser] = React.useState({email: '', password: ''});
  const history = useNavigate();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3010/v0/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        };
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        history('/home');
      })
      .catch((err) => {
        alert('Error logging in, please try again');
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <img src={slug} alt="Slugmail logo"/>
      <h2 id='welcome'>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email address"
        onChange={handleInputChange}
        aria-label={user.email}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
        required
      />
      <input type="submit" value="Sign In"/>
    </form>
  );
}

export default Login;
