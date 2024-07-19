$(document).ready(async function() {
    const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=1000";
    const $btn = $('#fetch-pokemon');
    const $pokemonContainer = $('#pokemon-container');

    // Fetch names and URLs of all Pokémon
    let allPokemon = [];
    try {
        const response = await fetch(baseURL);
        const data = await response.json();
        allPokemon = data.results;
    } catch (error) {
        console.error('Error:', error);
    }

    // Handle button click to fetch random Pokémon data
    $btn.on('click', async function() {
        $pokemonContainer.empty(); // Clear the container

        // Pick three random Pokémon
        let randomPokemon = [];
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * allPokemon.length);
            randomPokemon.push(allPokemon[randomIndex]);
        }

        // Fetch data for each random Pokémon
        try {
            const pokemonPromises = randomPokemon.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            const pokemonData = await Promise.all(pokemonPromises);

            // Fetch species data and display Pokémon
            for (let data of pokemonData) {
                const speciesUrl = data.species.url;
                const pokemonName = data.name;
                const pokemonImage = data.sprites.front_default;

                const speciesResponse = await fetch(speciesUrl);
                const speciesData = await speciesResponse.json();
                const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
                const description = flavorTextEntry ? flavorTextEntry.flavor_text : "No description available";

                // Append Pokémon data to the container
                $pokemonContainer.append(
                    `<div class="pokemon-card">
                        <h2>${pokemonName}</h2>
                        <img src="${pokemonImage}" alt="${pokemonName}">
                        <p>${description}</p>
                    </div>`
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
