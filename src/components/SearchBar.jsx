import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;