import PropTypes from 'prop-types';

function HousesSearch({ search, handleSearch }) {
  return (
    <div className="housesSearch">
      <h3 className="housesSearch__title">Search an house : </h3>
      <input
        className="housesSearch__input"
        type="text"
        // placeholder=""
        value={search}
        onChange={handleSearch}
      />
      {/* eslint-disable-next-line no-console */}
      {console.log(handleSearch)}
    </div>
  );
}

HousesSearch.propTypes = {
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
export default HousesSearch;
