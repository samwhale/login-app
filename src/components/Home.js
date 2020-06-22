import React from 'react';

const Home = ({ onSignOut, user }) => {
  return (
    <>
      <h2>Yay! You're signed in {user.username}!</h2>
      <button onClick={onSignOut}>Sign Out</button>
    </>
  )
}

export default Home;