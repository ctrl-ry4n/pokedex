const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const formulario = document.querySelector('.form');
const inputSearch = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
const fetchPokemon = async (pokemon) =>{
    const api_resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    //     if(api_resposta.status === 200){
    // const data = await api_resposta.json();
    // return data;
    //      };

    if (api_resposta.status === 404) {
        const data = {
            status: false,
            message: 'Not Found'
        }
        return data
    }
    
    
    const data = await api_resposta.json();
    data.status = true;
    return data
};

const renderPokemon = async (pokemon) =>{
        pokemonName.innerHTML = "loading..."
        pokemonNumber.innerHTML = ""

    const data = await fetchPokemon(pokemon);

    if (!data.status) {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = data.message;
        pokemonNumber.innerHTML = ""
        return
    }
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    inputSearch.value = '';
    searchPokemon = data.id;

        // if(data){
        //     pokemonImage.style.display = 'block';
        //     pokemonName.innerHTML = data.name;
        //     pokemonNumber.innerHTML = data.id;
        //     pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        //     inputSearch.value = '';
        //     searchPokemon = data.id;
        // } else{
        //     pokemonImage.style.display = 'none';
        //     pokemonName.innerHTML = "Not Found";
        //     pokemonNumber.innerHTML = ""
        // }
};

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputSearch.value);
    
})
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)    
    } 
    
    
})
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
    
})
renderPokemon('searchPokemon')
