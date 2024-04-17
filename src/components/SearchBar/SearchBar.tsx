import React, { useState } from 'react';
import './SearchBar.scss';

function SearchBar({ onSearchSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onSearchSubmit(newValue);
  };

  return (
    <div className="search-bar">
      <form className="search-bar">
        <input
          className="search-input"
          placeholder="Rechercher..."
          value={inputValue}
          onChange={handleChangeInput}
        />
      </form>
    </div>
  );
}

export default SearchBar;
