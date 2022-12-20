import PropTypes from 'prop-types';

function CharactersSearch({ search, handleSearch }) {
  return (
    <div className="charactersSearch">
      <h3 className="charactersSearch__title">Search character : </h3>
      <input
        className="charactersSearch__input"
        type="text"
        placeholder="john snow"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}

CharactersSearch.propTypes = {
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
export default CharactersSearch;
