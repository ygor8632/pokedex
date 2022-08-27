const pokemon_name = document.querySelector('.pokemon_name');
const pokemon_number = document.querySelector('.pokemon_number');
const pokemon_image = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const button_prev = document.querySelector('.btn_prev');
const button_next = document.querySelector('.btn_next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


        if (APIResponse.status === 200) {

            const data = await APIResponse.json();
            return data;
        }
}

const renderPokemon = async (pokemon) => {

    pokemon_name.innerHTML = 'Carregando ...';
    pokemon_number.innerHTML = '';

    const data = await fetchPokemon(pokemon);

        if (data) {
            pokemon_image.style.display = 'block';
            pokemon_name.innerHTML = data.name;
            pokemon_number.innerHTML = data.id;
            pokemon_image.src = data['sprites']['versions']['generation-v']['black-white']
            ['animated']['front_default'];    
            input.value = '';
            searchPokemon = data.id;

        } else {

            pokemon_image.style.display = 'none'
            pokemon_name.innerHTML = 'Não encontrado!';
            pokemon_number.innerHTML = '';
        }
}

// FORMULÁRIO DE PREENCHIMENTO...

form.addEventListener('submit', (event) => {

        event.preventDefault();

            renderPokemon(input.value.toLowerCase());

});

//BOTÃO PREV...

button_prev.addEventListener('click', () => {

    if(searchPokemon >1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

// BOTÃO NEXT...

button_next.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);

});

renderPokemon(searchPokemon);