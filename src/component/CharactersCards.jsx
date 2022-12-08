import { useEffect, useState } from 'react';
// import CharacterProfile from './CharacterProfile';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CharactersCards() {
  const [characters, setCharacters] = useState();

  useEffect(() => {
    axios
      .get(`https://anapioficeandfire.com/api/characters`)
      .then((res) => res.data)
      .then((data) => setCharacters(data))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
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
              <Link to="/Profile">profile</Link>
            </div>
          ))}
    </div>
  );
}

export default CharactersCards;
