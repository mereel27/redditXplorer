export const SearchBar = ({handleSearch, handleChange, term}) => {
  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          value={term}
        />
        <button id='search-button' type="submit"><i className="bi bi-search"></i></button>
      </form>
    </div>
  );
};
