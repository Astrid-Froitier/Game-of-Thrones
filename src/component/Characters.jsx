import React from 'react';

import CharactersCards from './CharactersCards';

function Characters() {
  return (
    <div className="characters">
      <div className="characters__title">
        <h1>All Characters</h1>
      </div>
      <CharactersCards />
    </div>
  );
}

export default Characters;
