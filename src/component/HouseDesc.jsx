import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import HouseContext from '../context/Housecontext';
import { getDetails } from '../utils/functions';

function HouseDesc() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [house, setHouse] = useState({});

  const { houses } = useContext(HouseContext);

  // const getId = (url) => {
  //   const id = url.split('/').pop() ?? null;
  //   return id;
  // };

  // const getDetails = async (url) => {
  //   if (url) {
  //     const res = await axios.get(url);
  //     return { name: res.data.name, id: getId(url) };
  //   }
  //   return { name: 'none', id: null };
  // };

  const getHouse = async () => {
    setIsLoading(true);
    try {
      let houseDetails = houses.find(
        (house) => house.url === `https://anapioficeandfire.com/api/houses/${params.id}`,
      );
      if (!houseDetails) {
        // eslint-disable-next-line no-console
        console.log('we fetch data from api');
        const response = await axios.get(`https://anapioficeandfire.com/api/houses/${params.id}`);
        houseDetails = response.data;
      }

      houseDetails.founderDetails = await getDetails(houseDetails.founderDetails);
      setHouse(houseDetails);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getHouse();
  }, [params.id]);

  if (isLoading || !house) {
    return <div>Is Loading </div>;
  }

  return (
    <div className="houseDesc">
      <h1 className="houseDesc__title">{house.name}</h1>
      <div className="houseDesc__details">
        Founder : {house.founderDetail?.id ? <Link>{house.founderDetails?.name}</Link> : 'unknown'}
        Current Lord :
        {house.currentLordDetail?.id ? <Link>{house.currentLordDetails?.name}</Link> : 'unknown'}
        <div>words : {house.words}</div>
        <div>coat of arms : {house.coatOfArms}</div>
        <div>Founded in : {house.founded}</div>
      </div>
    </div>
  );
}

export default HouseDesc;
