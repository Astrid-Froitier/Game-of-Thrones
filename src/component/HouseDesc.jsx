import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function HouseDesc() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [house, setHouse] = useState({});

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

  const getHouse = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://anapioficeandfire.com/api/houses/${params.id}`);
      const houseDetails = response.data;
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
    <div>
      <h1>{house.name}</h1>
      <Link> Founder : {house.founderDetails?.name}</Link>
      <Link> Current Lord : {house.currentLordDetails?.name}</Link>
      <div>words : {house.words}</div>
      <div>coat of arms : {house.coatOfArms}</div>
    </div>
  );
}

export default HouseDesc;
