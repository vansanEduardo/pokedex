const pokemon = document.querySelector(".pokemonimg img");
const pokemonDetails = document.querySelector(".details h2");
const btnRight = document.querySelector("#btnRight");
const btnLeft = document.querySelector("#btnLeft");
const numberBtn = document.querySelectorAll(".numbers button ");
const dellBtn = document.querySelector("#dell");
const checkBtn = document.querySelector("#check");
const shinyBtn = document.querySelector("#shiny");
const id = document.querySelector("#id h2");
let pokemonCont = 1;
let arryValue = "";


// requisição a PokeAPI
const getPokemon = async (pokemonCont) => {
try {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonCont}`);
  const data = await response.json();
  return data;
} catch (error) {
  alert("Ocorreu um erro ao buscar o Pokémon.")
}

};

// Exibir na tela os dados do pokemon
const updatePokemon = async (pokemonCont) => {
  const data = await getPokemon(pokemonCont);

  pokemon.src = data.sprites.other.home.front_default;
  pokemonDetails.innerHTML = data.name;
  id.innerHTML = pokemonCont;

  
};
updatePokemon(pokemonCont);

//Botão shiny
shinyBtn.addEventListener("click", async () => {
  const data =  await getPokemon(pokemonCont)

  pokemon.src = "";
  pokemon.src = data.sprites.other.home.front_shiny;
  
});

// Funcionalidade dos botoes numericos
numberBtn.forEach((item) => {
  item.addEventListener("click", () => {
    const value = item.value;

    arryValue += value;
    if (arryValue.length > 4) {
      arryValue = arryValue.slice(0, -1);
    }

    id.innerHTML = arryValue;
  });
});

// Funcionalidade do botao de certo
checkBtn.addEventListener("click", () => {

  if (arryValue.length > 4 || Number(arryValue) > 1025) {
    alert("Quantidade Maxima de Pokemon: 1025");
    arryValue = pokemonCont;
  }
  
  if (arryValue) {
    pokemonCont = arryValue;
    updatePokemon(arryValue);
    arryValue = "";
  } else {
    console.log("Nenhum valor armazenado");
  }

});

// Funcionalidade do botao de apagar o ultimo digito
dellBtn.addEventListener("click", () => {

  arryValue = arryValue.slice(0, -1);
  id.innerHTML = arryValue;

});


//Botão de ir +1

btnRight.addEventListener("click", () => {
  if (pokemonCont >= 1025) {
    pokemonCont = 1;
  } else {
    pokemonCont++;
  }

  updatePokemon(pokemonCont);
});

//Botão de voltar -1
btnLeft.addEventListener("click", () => {
  if (pokemonCont > 1) {
    pokemonCont--;
  } else if (pokemonCont === 1) {
    pokemonCont = 1025;
  }

  updatePokemon(pokemonCont);
});
