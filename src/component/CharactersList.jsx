import { useEffect, useState } from 'react';
import axios from 'axios';

import CharacterCard from './CharacterCard';
import CharactersSearch from './CharactersSearch';

function CharactersList() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const charactersAsc = characters.sort();

  const getHouse = async (character) => {
    // eslint-disable-next-line no-console
    console.log('character', character);
    if (character.allegiances.length > 0) {
      const house = await axios.get(character.allegiances[0]);
      // eslint-disable-next-line no-console
      console.log('house data', house.data);
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
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/characters?pageSize=200&page=${page}`,
      );
      const inflatedCharacters = await infalteHouse(response.data);
      setCharacters([...characters, ...inflatedCharacters]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setPage(page + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    if (page === 1) {
      getCharacters();
    }
  }, []);

  if (isLoading || !characters) {
    return <div>Is loading</div>;
  }

  return (
    <div className="charactersList">
      <h1 className="charactersList__title">All characters</h1>
      <CharactersSearch search={search} handleSearch={handleSearch} />
      <div className="charactersList__map">
        {charactersAsc &&
          charactersAsc
            .filter((characterAsc) => characterAsc.name !== '')
            .filter((characterAsc) => characterAsc.name.toLowerCase().includes(search))
            .map((characterAsc) => {
              const id = characterAsc.url.split('/').pop() ?? null;
              return (
                <div className="charactersList__map__details" key={characterAsc.url}>
                  <CharacterCard character={{ ...characterAsc, id }} search={search} />
                </div>
              );
            })}
      </div>
      <div className="housesList__button">
        <button className="housesList__button__css" onClick={() => getCharacters()}>
          See more
        </button>
      </div>
    </div>
  );
}

export default CharactersList;
