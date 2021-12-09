import { removeChildren } from "../utils/index.js";

function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
}

 function loadPokemon(offset, limit) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCards(pokeData)
      );
    }
  });
}

const pokeGrid = document.querySelector(".pokeGrid");
// const loadButton = document.querySelector(".loadPokemon");
// loadButton.addEventListener("click", () => {
//   removeChildren(pokeGrid);
//   loadPokemon(100, 50);
// });



/* First, get a reference to the pokemon choice button
Second, add an event listener on click
Third, use getAPIData with a URL like this https://pokeapi.co/api/v2/${promptedNameOrId}
Fourth, populatePokeCard with the pokemon data retrieved */
const chooseButton = document.querySelector('.choosePokemon')
chooseButton.addEventListener('click', () => {
  let searchName = prompt('What is the Name or Id of the pokemon you want to search?')
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${searchName}`)
  .then((searchedPokemon) => {
  populatePokeCards(searchedPokemon)
  })
   
   
})


// const allPokemon = []

// const sortButton = document.querySelector('.sortButton')
// sortButton.addEventListener('click', () => {
// getAPIData('https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0')
//   .then(async (data) => {
//     for (const pokemon of data.results) {
//       await getAPIData(pokemon.url).then((pokeData) => {
//         const mappedPokemon = {
//           abilities: pokeData.abilities,
//           height: pokeData.height,
//           id: pokeData.id,
//           name: pokeData.name,
//           types: pokeData.types,
//           weight: pokeData.weight
//         }
//         allPokemon.push(mappedPokemon)
//       })
//     }
//   })
// })

// console.log(allPokemon)

const moreButton = document.querySelector('.morePokemon')
moreButton.addEventListener('click', () => {
    let limit = prompt('How many Pokemon do you want to load?')
    let offset = prompt('Which pokemon ID do you want to start loading from?')
    loadPokemon(offset, limit)
    removeChildren(pokeGrid);
})

const newButton = document.querySelector(".newPokemon");
newButton.addEventListener("click", () => {
  let pokeName = prompt("What is the name of your new Pokemon?");
  let pokeHeight = prompt("What is the Pokemon's height?");
  let pokeWeight = prompt("What is the Pokemon's weight?");
  let pokeAbilities = prompt(
    "What are your Pokemon's abilities? (use a comma separated list)"
  );
  let pokeTypes = prompt("What are your Pokemon's types? (up to 2 types separated by a space)")
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    getAbilitiesArray(pokeAbilities),
    getTypesArray(pokeTypes)
  );
  populatePokeCards(newPokemon);
});

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(",");
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    };
  });
}

function getTypesArray(spacedString) {
  let tempArray = spacedString.split(' ')
  return tempArray.map((typeName) => {
    return {
      type: {
        name: typeName
      }
    }
  })
}

class Pokemon {
  constructor(name, height, weight, abilities, types) {
      (this.id = 'N/A'),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types);
  }
}

function populatePokeCards(singlePokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );

  const front = populateCardFront(singlePokemon);
  const back = populateCardBack(singlePokemon);

  pokeCard.appendChild(front);
  pokeCard.appendChild(back);
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

// function newPokemonImg(singlePokemon) {
//   let newPokeImg = document.createElement('img')
//   newPokeImg.srcset = 'images/pokeball.png'
// }

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  const pokeImg = document.createElement("img");
  pokeImg.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  console.log(pokeImg.srcset)
  if(pokeImg.srcset == 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/N/A.png') {
    pokeImg.srcset = '../images/pokeball.png'
  }

  const pokeCaption = document.createElement("figcaption");

  pokeCaption.textContent = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`;
  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);
  //  typesBackground(pokemon, pokeFront)
  return pokeFront;
}

// function typesBackground(pokemon, card) {
//     let pokeType1 = pokemon.types[0].type.name
//     let pokeType2 = pokemon.types[1]?.type.name
//     console.log(pokeType1, pokeType2)
//     if(!pokeType2) {
//     card.style.setProperty('background', getPokeTypeColor(pokeType1))
//     } else {
//       card.style.setProperty(
//         'background',
//         `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`
//       )
//     }
// }

// function getPokeTypeColor(pokeType) {
//     let color 
//     switch (pokeType) {
//         case 'grass': 
//         color = '#00FF00'
//         break
//         case 'fire': 
//         color = '#FF0000'
//         break
//         case 'water': 
//         color = '#0000FF'
//         break
//         case 'bug': 
//         color = '#7FFF00'
//         break
//         case 'normal': 
//         color = '#F5F5DC'
//         break
//         case 'flying': 
//         color = '#00FFFF'
//         break
//         case 'poison': 
//         color = '#C300FF'
//         break
//         case 'electric': 
//         color = '#C8FF00'
//         break
//         case 'psychic':
//         color = 'pink'
//         break
//         case 'ground':
//         color = 'brown'
//         break
//         case 'default': 
//         color = '#888'
//     }
//     return color
//     }

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";

  if(pokemon.id !== 'N/A') {
  const pokeID = document.createElement("h4")
  pokeID.textContent = `ID: ${pokemon.id}`
  pokeBack.appendChild(pokeID)
  }

  const label = document.createElement("h4");
  label.textContent = 'Abilities:';
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  const typesLable = document.createElement('h4')
  typesLable.textContent = 'Type:'
  const typeslist = document.createElement('ol')
  pokemon.types.forEach((pokeType) => {
    let typeItem = document.createElement('li')
    typeItem.textContent = pokeType.type.name 
    typeslist.appendChild(typeItem)
  })

  if(pokemon.stats) {
  const pokeHp = document.createElement('h4')
  pokeHp.textContent = `HP: ${pokemon.stats[0].base_stat}`
  pokeBack.appendChild(pokeHp)
  }

  const pokeHeight = document.createElement('h4')
  pokeHeight.textContent = `Height: ${pokemon.height}`

  const pokeWeight = document.createElement('h4')
  pokeWeight.textContent = `Weight: ${pokemon.weight}`


  pokeBack.appendChild(pokeHeight)
  pokeBack.appendChild(pokeWeight)
  pokeBack.appendChild(label);
  pokeBack.appendChild(abilityList);
  pokeBack.appendChild(typesLable)
  pokeBack.appendChild(typeslist)
  return pokeBack;
}
