import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemons }) {
  return (
    <div
      className={
        pokemons.length === 1
          ? "single-result-container"
          : "grid-container"
      }
    >
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList;