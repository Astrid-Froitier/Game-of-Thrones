import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterDesc() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState({});

  const getId = (url) => {
    const id = url.split('/').pop() ?? null;
    return id;
  };

  const getDetails = async (url) => {
    if (url) {
      const res = await axios.get(url);
      return { name: res.data.name, id: getId(url) };
    }
    return { name: 'none', id: null };
  };

  // display names for characters
  const getHouse = async (url) => {
    if (url) {
      const house = await axios.get(url.allegiances);
      return house.data.name;
    }
    return null;
  };

  // const inflateHouse = async (character) => {
  //   const inflatedHouse = await getHouse(character);
  //   return inflatedHouse;
  // };

  // // display spouse's name
  // const getSpouse = async (character) => {
  //   if (character.spouse !== null) {
  //     const partner = await axios.get(character.spouse);
  //     return partner.data.name;
  //   }
  //   return null;
  // };

  // const inflateSpouse = async (character) => {
  //   const inflatedSpouse = await getSpouse(character);
  //   return inflatedSpouse;
  // };

  // // // display father's name
  // const getFather = async (character) => {
  //   if (character.father !== null) {
  //     const father = await axios.get(character.father);
  //     return father.data.name;
  //   }
  //   return null;
  // };

  // const inflateFather = async (character) => {
  //   const inflatedFather = await getFather(character);
  //   return inflatedFather;
  // };

  // // display mother's name
  // const getMother = async (character) => {
  //   if (character.mother !== null) {
  //     const mother = await axios.get(character.mother);
  //     return mother.data.name;
  //   }
  //   return null;
  // };

  // const inflateMother = async (character) => {
  //   const inflatedMother = await getMother(character);
  //   return inflatedMother;
  // };

  const getCharacter = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://anapioficeandfire.com/api/characters/${params.id}`);
      // const spouse = await inflateSpouse(response.data);
      // const father = await inflateFather(response.data);
      // const mother = await inflateMother(response.data);
      const characterDetail = response.data;
      const house = await getHouse(characterDetail);
      characterDetail.spouseDetail = await getDetails(characterDetail.spouse);
      characterDetail.fatherDetail = await getDetails(characterDetail.father);
      characterDetail.motherDetail = await getDetails(characterDetail.mother);
      characterDetail.houseDetail = await getDetails(characterDetail.house);

      setCharacter({ ...characterDetail, house });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCharacter();
  }, [params.id]);

  if (isLoading || !character) {
    return <div>Is loading</div>;
  }

  return (
    <div className="Characters">
      <h1>{character.name}</h1>
      {/* <div key={id}> */}
      <p>{character.playedBy}</p>
      <p>{character.gender}</p>
      <p>{character.culture}</p>
      <p>title : {character.titles}</p>
      <p>alias : {character.aliases}</p>
      <p>season : {character.tvSeries} </p>
      <p>born : {character.born}</p>
      <p>died : {character.died}</p>
      father :
      {character.fatherDetail?.id ? (
        <Link to={`/characters/${character.fatherDetail?.id}`}>
          {character.fatherDetail?.name}{' '}
        </Link>
      ) : (
        'unknown'
      )}
      <br />
      mother :
      {character.motherDetail?.id ? (
        <Link to={`/characters/${character.motherDetail?.id}`}>{character.motherDetail?.name}</Link>
      ) : (
        'unknown'
      )}
      <br />
      husband :
      {character.spouseDetail?.id ? (
        <Link to={`/characters/${character.spouseDetail?.id}`}>{character.spouseDetail?.name}</Link>
      ) : (
        'unknown'
      )}
      <br />
      houses :
      {character.houseDetail?.id ? (
        <Link to={`/houses/${character.houseDetail?.id}`}>{character.houseDetail.name}</Link>
      ) : (
        'unknown'
      )}
      {/* eslint-disable-next-line no-console */}
      {console.log(character.houseDetail.id)}
      <p>{character.house}</p>
    </div>
  );
}

export default CharacterDesc;
