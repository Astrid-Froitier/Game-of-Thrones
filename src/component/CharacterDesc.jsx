import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterDesc() {
  const params = useParams();
  const [character, setCharacter] = useState({});

  // display house's name
  const getHouse = async (character) => {
    if (character.allegiances.length > 0) {
      const house = await axios.get(character.allegiances);
      return house.data.name;
    }
    return null;
  };

  const inflateHouse = async (character) => {
    const infaltedHouses = await getHouse(character);
    return infaltedHouses;
  };

  // display spouse's name
  const getSpouse = async (character) => {
    if (character.spouse !== null) {
      const partner = await axios.get(character.spouse);
      return partner.data.name;
    }
    return null;
  };

  const inflateSpouse = async (character) => {
    const inflatedSpouse = await getSpouse(character);
    return inflatedSpouse;
  };

  const getCharacter = async () => {
    try {
      const response = await axios.get(`https://anapioficeandfire.com/api/characters/${params.id}`);
      const house = await inflateHouse(response.data);
      const spouse = await inflateSpouse(response.data);
      setCharacter({ ...response.data, house, spouse });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <div className="Characters">
      <h1>Hello there {params.id}</h1>
      <div>
        <h2>{character.name}</h2>
        <p>{character.gender}</p>
        <p>{character.culture}</p>
        <p>title :{character.titles}</p>
        <p>alias :{character.aliases}</p>
        <p>season :{character.tvSeries}</p>
        <p>born :{character.born}</p>
        <p>died :{character.died}</p>
        <p>father :{character.father}</p>
        <p>mother :{character.mother}</p>
        <p>husband :{character.spouse}</p>
        <p>houses :{character.house}</p>
      </div>
    </div>
  );
}

export default CharacterDesc;
