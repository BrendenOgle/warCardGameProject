// Global variables for making the deck
let deck = []
let suits = ["♠️", "♣️", "♥️", "♦️"]
let value = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

let playerDeck = []
let computerDeck = []
let fieldDeck = []
let pile = document.getElementById("cardPile")
let container = document.getElementById("container")


// main function that will call all sub-functions
function startGame(){
    createDeck()
    document.getElementById("modal").style.visibility = "hidden"
    shuffleDeck(deck)
    shuffleDeck(deck)
    deckPile()
}

function shuffleDeck(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
    ];
    }
    return array;
}


function createDeck(){
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < value.length; j++){
            let card = {
                value: value[j],
                suit: suits[i]
            }
            deck.push(card)
        }
    }
    console.log(deck)
}



function deckPile(){

    for(let i = 0; i < deck.length; i++){
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <p class="cardValue">${deck[i].value}</p>
            <p class="cardSuit">${deck[i].suit}</p>
            <p class="rightPartCard cardSuit">${deck[i].suit}</p>
            <p class="rightPartCard cardValue">${deck[i].value}</p>
        `
        
        
        pile.appendChild(card)
    }
}

function dealHands(){
    let i = 0
    while(deck.length !== 0){
        let topCard = deck.pop()

        if(i === 0){
            computerDeck.push(topCard)
            i++
        }else if(i === 1){
            playerDeck.push(topCard)
            i--
        }
    }
    console.log(computerDeck)
    console.log(playerDeck)
    pile.innerHTML = ``
    pile.remove("div")
    document.getElementById("dealer").remove("button")
    
    let flipButton = document.createElement("button")
    let computerDeckContainer = document.createElement("div")
    let playerDeckContainer = document.createElement("div")
    flipButton.classList.add("flipButton")
    playerDeckContainer.classList.add("playerDeckContainer")
    computerDeckContainer.classList.add("computerDeckContainer")
    container.appendChild(computerDeckContainer)
    container.appendChild(flipButton)
    container.appendChild(playerDeckContainer)

    for(let i = 0; i < computerDeck.length; i++){
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <p class="cardValue">${computerDeck[i].value}</p>
            <p class="cardSuit">${computerDeck[i].suit}</p>
            <p class="rightPartCard cardSuit">${computerDeck[i].suit}</p>
            <p class="rightPartCard cardValue">${computerDeck[i].value}</p>
        `
        computerDeckContainer.appendChild(card)
    }

    for(let i = 0; i < playerDeck.length; i++){
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <p class="cardValue">${playerDeck[i].value}</p>
            <p class="cardSuit">${playerDeck[i].suit}</p>
            <p class="rightPartCard cardSuit">${playerDeck[i].suit}</p>
            <p class="rightPartCard cardValue">${playerDeck[i].value}</p>
        `
        playerDeckContainer.appendChild(card)
    }
    
    let activePlayerCard = document.createElement("div")
    let activeComputerCard = document.createElement("div")
    activePlayerCard.classList.add("activePlayerCard")
    activeComputerCard.classList.add("activeComputerCard")
    container.appendChild(activeComputerCard)
    container.appendChild(activePlayerCard)

    activeComputerCard.innerText = "Active Computer Card"
    activePlayerCard.innerText = "Active Player Card"

    flipButton.textContent = "Flip Cards"
    flipButton.onclick = flipCards
}

function flipCards(){
    
}




// This function creates a front facing card of the first card in the deck array

/* function showCard(){
    let card = document.createElement("div")
    let container = document.getElementById("container")
    container.appendChild(card)
    card.classList.add("card")
    card.innerHTML = `
        <p class="cardValue">${deck[0].value}</p>
        <p class="cardSuit">${deck[0].suit}</p>
        <p class="rightPartCard cardSuit">${deck[0].suit}</p>
        <p class="rightPartCard cardValue">${deck[0].value}</p>
    `
    if(deck[0].value === 11){
        let name = document.getElementsByClassName("cardValue")
        for(let i = 0; i < name.length; i++){
            name[i].textContent = "J"
        }
    }else if(deck[0].value === 12){
        let name = document.getElementsByClassName("cardValue")
        for(let i = 0; i < name.length; i++){
            name[i].textContent = "Q"
        }
    }else if(deck[0].value === 13){
        let name = document.getElementsByClassName("cardValue")
        for(let i = 0; i < name.length; i++){
            name[i].textContent = "K"
        }
    }else if(deck[0].value === 14){
        let name = document.getElementsByClassName("cardValue")
        for(let i = 0; i < name.length; i++){
            name[i].textContent = "A"
        }
    }
    
} */
