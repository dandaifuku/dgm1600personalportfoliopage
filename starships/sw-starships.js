import { starships } from "../data/starships.js";
import { getLastNumber, removeChildren } from "../utils/index.js"

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.shipViewer')

function populateNav() {
  starships.forEach(starship => {
      let anchorWrap = document.createElement('a')
      anchorWrap.href = '#'
      let listItem = document.createElement('li')
      listItem.textContent = starship.name

      anchorWrap.addEventListener('click', () => populateshipView(starship))

      anchorWrap.appendChild(listItem)
      navList.appendChild(anchorWrap)
  })
}

populateNav()

function populateshipView(shipData) {
    removeChildren(shipView)
  console.log(`You clicked on ${shipData.name}`)
  let shipImg = document.createElement('img')
  let shipNum = getLastNumber(shipData.url)
  shipImg.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
  shipView.appendChild(shipImg)
}