const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonNumber2 = document.querySelector('.pokemon__number2');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status ==200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Procurando...';
    pokemonNumber.innerHTML ='';
    pokemonNumber2.innerHTML ='';
    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display ='block';
        pokemonName.innerHTML = data.name;
        pokemonNumber2.innerHTML = data.id;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value ='';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display ='none';
        pokemonName.innerHTML = 'Não encontrado!';
        pokemonNumber.innerHTML = '';
        pokemonNumber2.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
} );


buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } 
   
} );

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
} );


renderPokemon(searchPokemon);



