import { useEffect, useState } from 'react';
import axios from 'axios';

import CharacterCard from './CharacterCard';

function CharactersList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  const getHouse = async (character) => {
    if (character.allegiances.length > 0) {
      const house = await axios.get(character.allegiances[0]);
      return house.data.name;
    }
    return null;
  };

  const infalteHouse = async (characters) => {
    const inflatedCharacters = await Promise.all(
      characters.map(async (character) => {
        const house = await getHouse(character);
        return { ...character, house };
      }),
    );
    return inflatedCharacters;
  };

  const getCharacters = async () => {
    try {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/characters?pageSize=50&page=${page}`,
      );
      // const characters = response.data;
      const inflatedCharacters = await infalteHouse(response.data);
      setCharacters([...characters, ...inflatedCharacters]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setPage(page + 1);
  };

  useEffect(() => {
    if (page === 1) {
      getCharacters();
    }
  }, []);

  return (
    <div className="charactersList">
      <h1 className="charactersList__title">All characters</h1>
      <div className="charactersList__map">
        {characters &&
          characters
            .filter((character) => character.name !== '')
            .map((character) => {
              const id = character.url.split('/').pop() ?? null;
              return (
                <div key={character.url}>
                  <CharacterCard character={{ ...character, id }} />
                </div>
              );
            })}
      </div>
      <button onClick={() => getCharacters()}>See more</button>
    </div>
  );
}

export default CharactersList;