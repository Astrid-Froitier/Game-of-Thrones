import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <div className="home__characters">
        <NavLink to="/characters">Characters</NavLink>
      </div>
      <div className="home__houses">
        <NavLink to="/houses">Houses</NavLink>
      </div>
    </div>
  );
}

export default Home;
