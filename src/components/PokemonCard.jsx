const typeColors = {
  fire: "type-fire",
  water: "type-water",
  grass: "type-grass",
  electric: "type-electric",
  ice: "type-ice",
  fighting: "type-fighting",
  poison: "type-poison",
  ground: "type-ground",
  flying: "type-flying",
  psychic: "type-psychic",
  bug: "type-bug",
  rock: "type-rock",
  ghost: "type-ghost",
  dragon: "type-dragon",
  dark: "type-dark",
  steel: "type-steel",
  fairy: "type-fairy",
  normal: "type-normal",
};

function PokemonCard({ pokemon }) {
  const hp = pokemon.stats[0].base_stat; // HP
  const attack = pokemon.stats[1].base_stat; // Attack
  const defense = pokemon.stats[2].base_stat; // Defense
  const specialAttack = pokemon.stats[3].base_stat; // Special Attack


  const getBarWidth = (value) => (value / 255) * 100;

  const imageSrc =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="card">
      <img src={imageSrc} alt={pokemon.name} className="card-img" />
      <h2 className="card-title">{pokemon.name}</h2>

      <div className="types-container">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className={`type-label ${typeColors[type.name] || "type-default"}`}
          >
            {type.name}
          </span>
        ))}
      </div>

      <div className="stats-container">
        {[
          ["HP", hp],
          ["ATK", attack],
          ["DEF", defense],
          ["SPA", specialAttack],
        ].map(([label, value]) => (
          <div key={label} className="stat-row">
            <span className="stat-label">{label}</span>
            <div className="stat-bar-container">
              <div
                className="stat-bar"
                style={{ width: `${getBarWidth(value)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;