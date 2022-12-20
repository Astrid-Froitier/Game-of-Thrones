import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function HouseCard({ house }) {
  return (
    <Link className="houseCard" to={`/houses/${house.id}`}>
      <h2 className="houseCard__title">{house.name}</h2>
      <div className="houseCard__details">
        <p>founded by : {house.founder ? house.founder : null}</p>
        <p>current lord : {house.currentLord ? house.currentLord : null}</p>
        <p>words : {house.words}</p>
      </div>
    </Link>
  );
}

HouseCard.propTypes = {
  house: PropTypes.object,
};

export default HouseCard;
