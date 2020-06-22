import React, { useState } from 'react';

import Home from './components/Home';
import SignInForm from './components/SignInForm';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    setUser(null);
  }

  return (
    <div className="App">
      {user ?
        <Home user={user} onSignOut={handleSignOut} /> :
        <SignInForm onSubmit={setUser} />
      }
    </div>
  );
}

export default App;
