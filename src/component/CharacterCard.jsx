import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CharacterCard({ character }) {
  return (
    <Link className="characterCard" to={`/characters/${character.id}`}>
      <h2 className="characterCard__name">{character.name}</h2>
      <p className="characterCard__culture">
        {character.culture === null ? null : character.culture}
      </p>
      <p className="characterCard__titles">
        {character.titles[0] === null ? null : character.titles[0]}
      </p>
      <p className="characterCard__aliases">
        {' '}
        {character.aliases[0] === null ? null : character.aliases[0]}
      </p>
      <p className="characterCard__playedBy">
        {character.playedBy[0] === null ? null : character.playedBy}
      </p>
      <p>{character.house}</p>
    </Link>
  );
}

CharacterCard.propTypes = {
  character: PropTypes.object,
};

export default CharacterCard;
