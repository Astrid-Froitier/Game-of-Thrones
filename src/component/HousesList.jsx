import { useEffect, useState } from 'react';
import axios from 'axios';

import HouseCard from './HouseCard';
import HousesSearch from './HousesSearch';

function HousesList() {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const houseAsc = houses.sort();

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

  const getHouses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/houses?pageSize=100&page${page}`,
      );
      const inflatedFounder = await inflateCharacters(response.data);
      const inflatedLord = await inflateCharacters(response.data);
      setHouses([...houses, ...inflatedLord, ...inflatedFounder]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setPage(page + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    if (page === 1) {
      getHouses();
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
        {houseAsc &&
          houseAsc
            .filter((house) => house.currentLord !== undefined)
            .map((house, index) => {
              const id = house.url.split('/').pop() ?? null;
              return (
                <div className="housesList__map__details" key={index}>
                  {<HouseCard house={{ ...house, id }} />}
                </div>
              );
            })}
      </div>
      <button onClick={() => getHouses()}>See more</button>
    </div>
  );
}

export default HousesList;
