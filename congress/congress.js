import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const members = [...senators, ...representatives]

const senatorDiv = document.querySelector('.senators')
const seniorityHeading = document.querySelector('.seniority')
const weaselOrderedList = document.querySelector('.weaselList')

function simplifiedMembers(chamberFilter) {
  const filteredArray = members.filter(member => chamberFilter ? member.short_title === chamberFilter : member)


    return filteredArray.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` ` 
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            gender: senator.gender,
            seniority: +senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
        }
    })
} 

function simplifiedMembersParty(chamberFilter) {
    const filteredArrayParty = members.filter(member => chamberFilter ? member.party === chamberFilter : member)

    return filteredArrayParty.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` ` 
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            gender: senator.gender,
            seniority: +senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
        }
    })
}

populateSenatorDiv(simplifiedMembers())

function populateSenatorDiv(simpleSenators) {
    simpleSenators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL

        figCaption.textContent = senator.name
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })
}

const filterSenators = (prop, value) => simplifiedMembers().filter(senator => senator[prop] === value)

const republicans = filterSenators('party', 'R')
const femaleSenators = filterSenators('gender', 'F')

const mostSeniorMember = simplifiedMembers().reduce((acc, senator) => {
   return acc.seniority > senator.seniority ? acc : senator
})

// seniorityHeading.textContent = `The most senior member of Congress is ${mostSeniorMember.name} who has been in for ${mostSeniorMember.seniority} years!`

const mostLoyal = simplifiedMembers().reduce((acc, senator) => {
if(senator.loyaltyPct === 100) {
    acc.push(senator)
} 
return acc
}, [])

const biggestWeasel = simplifiedMembers().reduce((acc, senator) => (acc.missedVotesPct || 0) > senator.missedVotesPct ? acc : senator, {})

const biggestWeasels = simplifiedMembers().filter(senator => senator.missedVotesPct >= 50)


// biggestWeasels.forEach(weasel => {
//     let listItem = document.createElement('li')
//     listItem.textContent = weasel.name
//     weaselOrderedList.appendChild(listItem)
// })

const allButton = document.querySelector('.allButton')

allButton.addEventListener('click', () => {
    removeChildren(senatorDiv)
    populateSenatorDiv(simplifiedMembers())
})

const repubButton = document.querySelector('.repubButton')

repubButton.addEventListener('click', () => {
    removeChildren(senatorDiv)
    populateSenatorDiv(simplifiedMembersParty('R'))
})

const demoButton = document.querySelector('.demoButton')

demoButton.addEventListener('click', () => {
    removeChildren(senatorDiv)
    populateSenatorDiv(simplifiedMembersParty('D'))
})

const senButton = document.querySelector('.senButton')

senButton.addEventListener('click', () => {
    removeChildren(senatorDiv)
    populateSenatorDiv(simplifiedMembers('Sen.'))
})

const repreButton = document.querySelector('.repreButton')

repreButton.addEventListener('click', () => {
    removeChildren(senatorDiv)
    populateSenatorDiv(simplifiedMembers('Rep.'))
})