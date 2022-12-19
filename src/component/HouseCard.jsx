import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function HouseCard({ house }) {
  return (
    <Link to={`/houses/${house.id}`}>
      <h2>{house.name}</h2>
      <p>founder = {house.founder}</p>
      <p>current lord :{house.currentLord}</p>
      <p>words : {house.words}</p>
    </Link>
  );
}

HouseCard.propTypes = {
  house: PropTypes.object,
};

export default HouseCard;
