import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <div className="home__characters">
        <NavLink to="/characters" className="home__characters__link">
          Characters
        </NavLink>
      </div>
      <div className="home__houses">
        <NavLink to="/houses" className="home__houses__link">
          Houses
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
