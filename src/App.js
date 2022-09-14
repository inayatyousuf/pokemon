import React, { useEffect, useState } from "react";
import './App.css'
function App() {
const [allPokemons, setAllPokemons] = useState([]);
const [loadPoke, setLoadPoke] = useState(
	"https://pokeapi.co/api/v2/pokemon?limit=20"
);
const getAllPokemons = async () => {
	const res = await fetch(loadPoke);
	const data = await res.json();
	setLoadPoke(data.next);

	function createPokemonObject(result) {
	result.forEach(async (pokemon) => {
		const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
		);
		const data = await res.json();
		setAllPokemons((currentList) => [...currentList, data]);
	});
	}
	createPokemonObject(data.results);
	await console.log(allPokemons);
};
useEffect(() => {
	getAllPokemons();
}, []);

return (
	<div className="app-container">
	<h1>Pokemon</h1>

	<div className="pokemon-container">

		{allPokemons.map((pokemon, index) => (
      <div className="cards" key={index}>
       
        <img src={pokemon.sprites.back_default} alt={pokemon.name}  loading="lazy"/>
        <p>{pokemon.name}</p>
      
       
        
      </div>
      
		))}
		
	
	</div>
  <button className="load-more"
		onClick={() => getAllPokemons()}>
		More Pokemons
		</button>
	</div>
);
}

export default App;





