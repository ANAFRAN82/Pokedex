import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import "./styles.css";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      if (!response.ok) throw new Error("Error al cargar los Pokémon");
      const data = await response.json();

      const details = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          if (!res.ok) throw new Error("Error al cargar detalles");
          return res.json();
        })
      );

      setPokemonList((prevList) => {
        const newPokemons = details.filter(
          (newPokemon) => !prevList.some((prev) => prev.id === newPokemon.id)
        );
        return [...prevList, ...newPokemons];
      });
      setOffset((prevOffset) => prevOffset + 20);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPokemons(pokemonList);
    } else {
      const firstMatch = pokemonList.find((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemons(firstMatch ? [firstMatch] : []);
    }
  }, [searchTerm, pokemonList]);

  return (
    <div className="container">
      <h1 className="title">Pokédex</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PokemonList pokemons={filteredPokemons} />
      {searchTerm.trim() === "" && (
        <div className="load-more-container">
          <button
            onClick={fetchPokemons}
            disabled={loading}
            className="load-more-button"
          >
            {loading ? "Cargando..." : "Cargar más"}
          </button>
        </div>
      )}
    </div>
  );
}