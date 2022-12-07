import React from 'react';

import CharactersCards from './CharactersCards';

function Families() {
  return (
    <div className="characters">
      <div className="characters__title">
        <h1>All Characters</h1>
      </div>
      <CharactersCards />
    </div>
  );
}

export default Families;
