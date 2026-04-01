// Global variables for making the deck
let deck = []
let suits = ["♠️", "♣️", "♥️", "♦️"]
/* let value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] */
let value = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]


let playerDeck = []
let computerDeck = []
let fieldDeck = []
let warDeck = []
let pile = document.getElementById("cardPile")
let container = document.getElementById("container")
let warBtn = document.getElementById("warBtn")


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
    document.getElementById("dealer").remove()
    
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
    flipButton.id = "flipBtn"
    flipButton.onclick = flipCards
}

function flipCards(){
    document.getElementById("flipBtn").style.visibility = "hidden"
    fieldDeck.unshift(playerDeck[playerDeck.length - 1])
    fieldDeck.unshift(computerDeck[computerDeck.length - 1])
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
            card.classList.add("fieldCard")
            card.innerHTML = `
                <p class="cardValue">${fieldDeck[1].value}</p>
                <p class="cardSuit">${fieldDeck[1].suit}</p>
                <p class="rightPartCard cardSuit">${fieldDeck[1].suit}</p>
                <p class="rightPartCard cardValue">${fieldDeck[1].value}</p>
            `
            activePlayerCard.textContent = ""
            activePlayerCard.appendChild(card)
        }else if(i === 1){
            let card = document.createElement("div")
            card.classList.add("card")
            card.classList.add("fieldCard")
            card.innerHTML = `
                <p class="cardValue">${fieldDeck[0].value}</p>
                <p class="cardSuit">${fieldDeck[0].suit}</p>
                <p class="rightPartCard cardSuit">${fieldDeck[0].suit}</p>
                <p class="rightPartCard cardValue">${fieldDeck[0].value}</p>
            `
            activeComputerCard.textContent = ""
            activeComputerCard.appendChild(card)
        }
    }

    if(fieldDeck[1].value > fieldDeck[0].value){
        let whoWins = document.getElementById("whoWins")
        for(let i = 0; i < fieldDeck.length; i++){
            playerDeck.unshift(fieldDeck[i])
        }
        whoWins.textContent = "Player Wins! Cards added to bottom of deck!"
        fieldDeck = []

        setTimeout(() =>{
            modal2.style.visibility = "visible"
            modal2.style.opacity = "1"
            hideCards()
        }, 2000)

        setTimeout(() =>{
            modal2.style.visibility = "hidden"
            modal2.style.opacity = "0"
            showCards()
            activeComputerCard.innerHTML = `Active Computer Card`
            activePlayerCard.innerHTML = `Active Player Card`
            document.getElementById("flipBtn").style.visibility = "visible"
        }, 4000)

    } else if(fieldDeck[0].value > fieldDeck[1].value){
        let whoWins = document.getElementById("whoWins")
        for(let i = 0; i < fieldDeck.length; i++){
            computerDeck.unshift(fieldDeck[i])
        }
        whoWins.textContent = "Computer Wins! Cards added to bottom of deck!"
        fieldDeck = []
        setTimeout(() =>{
            modal2.style.visibility = "visible"
            modal2.style.opacity = "1"
            hideCards()
        }, 2000)

        setTimeout(() =>{
            modal2.style.visibility = "hidden"
            modal2.style.opacity = "0"
            showCards()
            activeComputerCard.innerHTML = `Active Computer Card`
            activePlayerCard.innerHTML = `Active Player Card`
            document.getElementById("flipBtn").style.visibility = "visible"
        }, 4000)

    }else if(fieldDeck[0].value === fieldDeck[1].value){
        setTimeout(() =>{
            warButton()
        }, 2000)
    }
    console.log(playerDeck.length)
    console.log(computerDeck.length)
}

function warButton(){
    document.getElementById("modal3").style.visibility = "visible"
    warBtn.style.visibility = "visible"
    warBtn.style.opacity = "1"
    hideCards()
    warBtn.onclick = war
}

function war(){
    if(playerDeck.length < 3 || computerDeck.length < 3){
        endGame()
        return
    }
    document.getElementById("modal3").style.visibility = "hidden"
    warBtn.style.visibility = "hidden"
    showCards()
    
    let computerDeckExcess = []
    let playerDeckExcess = []

    let excessCard1 = document.createElement("div")
    excessCard1.classList.add("excessCard1")
    container.appendChild(excessCard1)

    let excessCard2 = document.createElement("div")
    excessCard2.classList.add("excessCard2")
    container.appendChild(excessCard2)

    playerDeckExcess.unshift(fieldDeck[1])
    fieldDeck.pop()
    computerDeckExcess.unshift(fieldDeck[0])
    fieldDeck.pop()

    for(let i = 0; i < 3; i++){
        playerDeckExcess.unshift(playerDeck[playerDeck.length -1])
        playerDeck.pop()
        computerDeckExcess.unshift(computerDeck[computerDeck.length -1])
        computerDeck.pop()
    }

    let activePlayerCard = document.getElementById("activePlayerCard")
    let activeComputerCard = document.getElementById("activeComputerCard")
    activePlayerCard.innerHTML = "Active Player Card"
    activeComputerCard.innerHTML = "Active Computer Card"
    
    for(let i = 0; i < fieldDeck.length; i++){
        if(i === 0){
            let card = document.createElement("div")
            card.classList.add("card")
            card.classList.add("fieldCard")
            card.innerHTML = `
                <p class="cardValue">${fieldDeck[1].value}</p>
                <p class="cardSuit">${fieldDeck[1].suit}</p>
                <p class="rightPartCard cardSuit">${fieldDeck[1].suit}</p>
                <p class="rightPartCard cardValue">${fieldDeck[1].value}</p>
            `
            activePlayerCard.textContent = ""
            activePlayerCard.appendChild(card)
        }else if(i === 1){
            let card = document.createElement("div")
            card.classList.add("card")
            card.classList.add("fieldCard")
            card.innerHTML = `
                <p class="cardValue">${fieldDeck[0].value}</p>
                <p class="cardSuit">${fieldDeck[0].suit}</p>
                <p class="rightPartCard cardSuit">${fieldDeck[0].suit}</p>
                <p class="rightPartCard cardValue">${fieldDeck[0].value}</p>
            `
            activeComputerCard.textContent = ""
            activeComputerCard.appendChild(card)
        }
    }

    for(let i = 0; i < computerDeckExcess.length; i++){
        let card = document.createElement("div")
            card.classList.add("card")
            card.innerHTML = `
                <p class="cardValue">${computerDeckExcess[i].value}</p>
                <p class="cardSuit">${computerDeckExcess[i].suit}</p>
                <p class="rightPartCard cardSuit">${computerDeckExcess[i].suit}</p>
                <p class="rightPartCard cardValue">${computerDeckExcess[i].value}</p>
            `
        excessCard1.textContent = ""
        excessCard1.appendChild(card)
    }
    for(let i = 0; i < computerDeckExcess.length; i++){
        let card = document.createElement("div")
            card.classList.add("card")
            card.innerHTML = `
                <p class="cardValue">${playerDeckExcess[i].value}</p>
                <p class="cardSuit">${playerDeckExcess[i].suit}</p>
                <p class="rightPartCard cardSuit">${playerDeckExcess[i].suit}</p>
                <p class="rightPartCard cardValue">${playerDeckExcess[i].value}</p>
            `
        excessCard2.textContent = ""
        excessCard2.appendChild(card)
    }

    
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

function endGame(){
    alert("Game Over")
}
