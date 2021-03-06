import React, { useState } from 'react';
import { signUserIn } from '../utils/sign-in';

const SignInForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSignInForm = (event) => {
    event.preventDefault();
    setLoading(true);

    signUserIn(username, password).then(user => {
      onSubmit(user)
    }).catch(error => {
      setErrorMessage(error.message);
    }).finally(() => {
      setLoading(false);
    });
  }

  const error = errorMessage ?
    <p className="error-message">{errorMessage}</p> :
    <div className="error-placeholder" />

  return (
    <>
      <h2>Welcome</h2>
      {loading ?
        <h4>loading...</h4> :
        <form className="Sign-in-form" onSubmit={handleSignInForm}>
          {error}
          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={username} onChange={handleUsernameChange} />
          
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={handlePasswordChange} />

          <button type="submit">Sign In</button>
        </form>
      }
    </>
  )
}

export default SignInForm;