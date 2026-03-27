// Global variables for making the deck
let deck = []
let suits = ["♠️", "♣️", "♥️", "♦️"]
let value = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

let playerDeck = []
let computerDeck = []


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
    let pile = document.getElementById("cardPile")

    for(let i = 0; i < deck.length; i++){
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <p class="cardValue">${deck[i].value}</p>
            <p class="cardSuit">${deck[i].suit}</p>
            <p class="rightPartCard cardSuit">${deck[i].suit}</p>
            <p class="rightPartCard cardValue">${deck[i].value}</p>
        `
        
        card.onclick = function(){
            card.remove("div")
        }
        pile.appendChild(card)
    }
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
