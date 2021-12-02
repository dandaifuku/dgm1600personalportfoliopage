async function getAPIData(url) {
    try {
const response = await fetch(url)
const data = await response.json()
console.log(data)
//const data = await response.json()
    }
    catch (error) {
        console.error(error)
    }
}

getAPIData('https://pokeapi.co/api/v2/pokemon/snorlax')