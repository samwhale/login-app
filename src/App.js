import React, { useState } from 'react';


import Home from './components/Home';
import SignInForm from './components/SignInForm';
import { signUserIn } from './utils/sign-in';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (username, password) => {
    return signUserIn(username, password).then((user) => {
      setUser(user)
      setErrorMessage(null);
    }).catch((error) => {
      setErrorMessage(error.message);
    });
  }

  const handleSignOut = () => {
    setUser(null);
  }

  return (
    <div className="App">
      {user ?
        <Home user={user} onSignOut={handleSignOut} /> :
        <SignInForm
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
        />
    }
    </div>
  );
}

export default App;
