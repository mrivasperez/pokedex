//selector for poke_container ID
const poke_container = 
document.getElementById('poke_container');

//object to create colors for poke types
const colors = {
    fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

// get rid of color keys from const colors
const main_types = Object.keys(colors);

// set number of pokemons to be displayed
const pokemons_number = 150;

// get pokemon
const fetchPokemon = async() => {
    for(let i = 1; i <= pokemons_number; i++){
        await getPokemon(i);
    }
}

// get the pokemon from pokeapi
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

// create the pokemon card
function createPokemonCard(pokemon){
    //create a new div
    const pokemonEl = document.createElement('div');
    //add class of pokemon to div
    pokemonEl.classList.add('pokemon');
    //get array of types, map over them, and select which one appears first
    const poke_types = pokemon.types.map(el => el.type.name);
    //find all the types and get the first one that is in the array above
    const type = main_types.find(
        type => poke_types.indexOf(type) > -1
    );
    //capitalize the first letter of Pokemon name
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    //get the color of the Pokemon
    const color = colors[type];
    //change background color of card to relevant color per type
    pokemonEl.style.backgroundColor = color;
    //add pokemon card text
    //TODO!!!!!!!!!!!
    //reformat type to say, cap[0] Type
    const pokeInnerHtml = `
        <div class = "img-container">
            <img src = "https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
        </div>
        <div class = "info">
            <!-- format to number to be #00X-->
            <span class= "number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class = "name">${name}</h3>
            <small class = "type">Type: <span>${type}</span></small>
        </div>
    `;
    //add html
    pokemonEl.innerHTML = pokeInnerHtml;
    // append (add) new pokemon to the list
    poke_container.appendChild(pokemonEl);

}

//get pokemon
fetchPokemon();
