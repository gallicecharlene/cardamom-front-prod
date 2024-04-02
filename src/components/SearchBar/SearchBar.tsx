import './SearchBar.scss';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Rechercher..." className="search-input" />
      <button className="search-button">Rechercher</button>
    </div>
  );
}

export default SearchBar;
