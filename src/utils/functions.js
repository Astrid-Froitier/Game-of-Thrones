import axios from 'axios';

export const getId = (url) => {
  const id = url.split('/').pop() ?? null;
  return id;
};

export const getDetails = async (url) => {
  if (url) {
    const res = await axios.get(url);
    return { name: res.data.name, id: getId(url) };
  }
  return { name: 'none', id: null };
};

export const inflateCharacterData = async (character) => {
  const spouseDetail = await getDetails(character.spouse);
  const fatherDetail = await getDetails(character.father);
  const motherDetail = await getDetails(character.mother);
  const houseDetail = await getDetails(character.allegiances[0]);
  return { ...character, spouseDetail, fatherDetail, motherDetail, houseDetail };
};
