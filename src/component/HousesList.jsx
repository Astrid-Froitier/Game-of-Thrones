import { useEffect, useState } from 'react';
import axios from 'axios';

function HousesList() {
  const [houses, setHouses] = useState([]);
  const [page, setPage] = useState(1);

  const getFounder = async (house) => {
    if (house.founder !== null) {
      const foundedBy = await axios.get(house.founder);
      return foundedBy.data.name;
    }
    return null;
  };

  const inflateFounder = async (houses) => {
    const inflatedHouses = await Promise.all(
      houses.map(async (house) => {
        const founder = await getFounder(house);
        return { ...house, founder };
      }),
    );
    return inflatedHouses;
  };

  const getHouses = async () => {
    try {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/houses?pageSize=50&page${page}`,
      );
      const inflatedHouses = await inflateFounder(response.data);
      setHouses([...houses, ...inflatedHouses]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setPage(page + 1);
  };

  useEffect(() => {
    if (page === 1) {
      getHouses();
    }
  }, []);

  return (
    <div className="housesList">
      <h1 className="housesList__title">All houses</h1>
      <div className="housesList__map">
        {houses &&
          houses.map((house, index) => {
            return (
              <div className="housesList__map__details" key={index}>
                <h2 className="housesList__map__details__title">{house.name}</h2>
                <p>{house.region}</p>
                <p>founded by : {house.founder}</p>
                {/* <p>{house.titles[0] === null ? null : house.titles[0]}</p> */}
              </div>
            );
          })}
      </div>
      <button onClick={() => getHouses()}>See more</button>
    </div>
  );
}

export default HousesList;
