import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import HouseContext from '../context/Housecontext';
import HouseCard from './HouseCard';
import HousesSearch from './HousesSearch';

function HousesList() {
  // const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { houses, setHouses } = useContext(HouseContext);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFounder = async (house) => {
    if (house.founder !== null) {
      const foundedBy = await axios.get(house.founder);
      return foundedBy.data.name;
    }
    return null;
  };

  const getLord = async (house) => {
    if (house.currentLord !== null) {
      const lord = await axios.get(house.currentLord);
      return lord.data.name;
    }
    return null;
  };

  const inflateCharacters = async (houses) => {
    const inflatedCharacters = await Promise.all(
      houses.map(async (house) => {
        const currentLord = await getLord(house);
        const founder = await getFounder(house);
        return { ...house, currentLord, founder };
      }),
    );
    return inflatedCharacters;
  };

  const getHouses = async (houses, page) => {
    // eslint-disable-next-line no-console
    console.log('page', page);
    let updatedHouses = houses;
    try {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/houses?pageSize=50&page=${page}`,
      );
      const inflatedFounder = await inflateCharacters(response.data);
      // eslint-disable-next-line no-console
      // console.log('inflatedFounder', inflatedFounder);
      if (inflatedFounder.length > 0) {
        updatedHouses = [...houses, ...inflatedFounder];
        // setHouses([...houses, ...inflatedFounder]);
        await getHouses(updatedHouses, page + 1);
      } else {
        setIsLoading(false);
        setHouses(updatedHouses);
        return;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    if (houses.length === 0) {
      setIsLoading(true);

      getHouses([], 1);
    }
  }, []);

  if (isLoading || !houses) {
    return <div>Is loading</div>;
  }

  return (
    <div className="housesList">
      <h1 className="housesList__title">All houses</h1>
      <HousesSearch house={houses} search={search} handleSearch={handleSearch} />
      <div className="housesList__map">
        {houses &&
          houses
            // .filter((house) => house.founder !== '')
            .filter((house) => house.name.toLowerCase().includes(search))
            .map((house, index) => {
              const id = house.url.split('/').pop() ?? null;
              return (
                <div className="housesList__map__details" key={index}>
                  {<HouseCard house={{ ...house, id }} search={search} />}
                </div>
              );
            })}
      </div>
      <div className="housesList__button">
        <button className="housesList__button__css" type="submit" onClick={() => getHouses()}>
          See more
        </button>
      </div>
    </div>
  );
}

export default HousesList;
