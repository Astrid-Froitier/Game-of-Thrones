import { useEffect, useState } from 'react';
import axios from 'axios';

function CharactersCards() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [characters, setCharacters] = useState({});

  const getCharacters = () => {
    axios
      .get(`https://anapioficeandfire.com/api/characters`)
      .then((res) => res.data)
      .then((data) => setCharacters(data))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="Characters">
      {characters &&
        characters
          .filter((character) => character.name !== '')
          .map((character) => (
            <div key={character.name}>
              <h2>name: {character.name}</h2>
              <p>first aliases :{character.aliases}</p>
              <p>titre : {character.titles}</p>
              <p>actor : {character.playedBy}</p>
              <p>first house : {character.allegiances}</p>
            </div>
          ))}
    </div>
  );
}

export default CharactersCards;
