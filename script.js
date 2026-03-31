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
    activePlayerCard.id = "activePlayerCard"
    activeComputerCard.id = "activeComputerCard"
    container.appendChild(activeComputerCard)
    container.appendChild(activePlayerCard)

    activeComputerCard.textContent = "Active Computer Card"
    activePlayerCard.textContent = "Active Player Card"

    flipButton.textContent = "Flip Cards"
    flipButton.onclick = flipCards
}

function flipCards(){
    fieldDeck.push(playerDeck[playerDeck.length - 1])
    fieldDeck.push(computerDeck[computerDeck.length - 1])
    playerDeck.pop()
    computerDeck.pop()

    let computerDeckContainer = document.getElementsByClassName("computerDeckContainer")[0]
    let playerDeckContainer = document.getElementsByClassName("playerDeckContainer")[0]
    
    computerDeckContainer.innerHTML = ``
    playerDeckContainer.innerHTML = ``
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
    
    let modal2 = document.getElementById("modal2")
    console.log(fieldDeck)
    let activePlayerCard = document.getElementById("activePlayerCard")
    let activeComputerCard = document.getElementById("activeComputerCard")

    for(let i = 0; i < fieldDeck.length; i++){
        if(i === 0){
            let card = document.createElement("div")
            card.classList.add("card")
            card.innerHTML = `
                <p class="cardValue">${fieldDeck[0].value}</p>
                <p class="cardSuit">${fieldDeck[0].suit}</p>
                <p class="rightPartCard cardSuit">${fieldDeck[0].suit}</p>
                <p class="rightPartCard cardValue">${fieldDeck[0].value}</p>
            `
            activePlayerCard.appendChild(card)
            activePlayerCard.innerHTML = ``
        }else if(i === 1){
            let card = document.createElement("div")
            card.classList.add("card")
            card.innerHTML = `
                <p class="cardValue">${fieldDeck[1].value}</p>
                <p class="cardSuit">${fieldDeck[1].suit}</p>
                <p class="rightPartCard cardSuit">${fieldDeck[1].suit}</p>
                <p class="rightPartCard cardValue">${fieldDeck[1].value}</p>
            `
            activeComputerCard.appendChild(card)
            activeComputerCard.innerHTML = ``
        }
        fieldDeck = []
    }


    setTimeout(() =>{
        modal2.style.visibility = "visible"
        modal2.style.opacity = "1"
        hideCards()
    }, 1000)

    setTimeout(() =>{
        modal2.style.visibility = "hidden"
        modal2.style.opacity = "0"
        showCards()
    }, 2000)
}

function hideCards(){
    let cards = document.getElementsByClassName("card")
    console.log(cards)
    for(let i = 0; i < cards.length; i++){
        cards[i].style.visibility = "hidden"
    }
    document.getElementsByClassName("activeComputerCard")[0].style.visibility = "hidden"
    document.getElementsByClassName("activePlayerCard")[0].style.visibility = "hidden"
    document.getElementsByClassName("flipButton")[0].style.visibility = "hidden"
}

function showCards(){
    let cards = document.getElementsByClassName("card")
    console.log(cards)
    for(let i = 0; i < cards.length; i++){
        cards[i].style.visibility = "visible"
    }
    document.getElementsByClassName("activeComputerCard")[0].style.visibility = "visible"
    document.getElementsByClassName("activePlayerCard")[0].style.visibility = "visible"
    document.getElementsByClassName("flipButton")[0].style.visibility = "visible"
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
