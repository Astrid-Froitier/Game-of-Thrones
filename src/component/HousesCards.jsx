import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HousesCards() {
  const [houses, setHouses] = useState();

  useEffect(() => {
    axios
      .get('https://anapioficeandfire.com/api/houses')
      .then((res) => res.data)
      .then((data) => setHouses(data))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {houses &&
        houses.map((house) => (
          <div key={house.name}>
            <h2>name: {house.name}</h2>
            <p>region :{house.region}</p>
            <p>titre : {house.titles}</p>
          </div>
        ))}
    </div>
  );
}

export default HousesCards;
