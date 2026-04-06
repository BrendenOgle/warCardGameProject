// Global variables for making the deck
let deck = []
let suits = ["♠️", "♣️", "♥️", "♦️"]
let value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
/* let value = [2, 2, 2 ,2, 2, 2, 2, 2, 2, 2, 2, 2 , 2, 2] */

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
            Back Of Card
        `
        computerDeckContainer.appendChild(card)
    }

    for(let i = 0; i < playerDeck.length; i++){
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            Back Of Card
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
    if(playerDeck < 1 || computerDeck < 1){
        endGame()
        return
    }
    document.getElementById("flipBtn").style.visibility = "hidden"
    document.getElementById("flipBtn").textContent = "Flip Cards"
    let playerCard = playerDeck.pop()
    let computerCard = computerDeck.pop()

    fieldDeck = [computerCard, playerCard]

    let computerDeckContainer = document.getElementsByClassName("computerDeckContainer")[0]
    let playerDeckContainer = document.getElementsByClassName("playerDeckContainer")[0]
    
    computerDeckContainer.innerHTML = ``
    playerDeckContainer.innerHTML = ``
    for(let i = 0; i < computerDeck.length; i++){
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            Back Of Card
        `
        computerDeckContainer.appendChild(card)
    }

    for(let i = 0; i < playerDeck.length; i++){
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            Back Of Card
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
        fieldDeck.length = 0

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
        fieldDeck.length = 0
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
    if(playerDeck.length < 3 || computerDeck.length < 3){
        endGame()
        return
    }
    document.getElementById("flipBtn").style.visibility = "hidden"
    document.getElementById("modal3").style.visibility = "visible"
    warBtn.style.visibility = "visible"
    warBtn.style.opacity = "1"
    hideCards()
    warBtn.onclick = war
}

function war(){
    if(playerDeck.length < 4 || computerDeck.length < 4){
        endGame()
        return
    }
    let flipButton = document.getElementById("flipBtn")
    flipButton.style.visibility = "visible"
    document.getElementById("modal3").style.visibility = "hidden"
    warBtn.style.visibility = "hidden"
    showCards()
    warDeck.push(...fieldDeck)

    
    let warPile = document.createElement("div")
    warPile.classList.add("warPile")
    warPile.id = "warPile"
    container.appendChild(warPile)

    for(let i = 0; i < 3; i++){
        warDeck.push(computerDeck.pop())
    }
    for(let i = 0; i < 3; i++){
        warDeck.push(playerDeck.pop())
    }

    let computerDeckContainer = document.getElementsByClassName("computerDeckContainer")[0]
    let playerDeckContainer = document.getElementsByClassName("playerDeckContainer")[0]

    computerDeckContainer.innerHTML = ""
    playerDeckContainer.innerHTML = ""
    for(let i = 0; i < computerDeck.length; i++){
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            Back Of Card
        `
        computerDeckContainer.appendChild(card)
    }

    for(let i = 0; i < playerDeck.length; i++){
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            Back Of Card
        `
        playerDeckContainer.appendChild(card)
    }

    console.log(playerDeck)
    console.log(computerDeck)

    for(let i = 0; i < warDeck.length; i++){
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <p class="cardValue">${warDeck[i].value}</p>
            <p class="cardSuit">${warDeck[i].suit}</p>
            <p class="rightPartCard cardSuit">${warDeck[i].suit}</p>
            <p class="rightPartCard cardValue">${warDeck[i].value}</p>
        `
        warPile.appendChild(card)
    }
    console.log(warDeck)
    activeComputerCard.innerHTML = "Active Computer Card"
    activePlayerCard.innerHTML = "Active Player Card"

    flipButton.classList.remove("flipButton")
    flipButton.classList.add("newFlipBtn")
    flipButton.style.visibility = "visible"
    flipButton.textContent = "Flip Next Card"

    flipButton.onclick = continueWar
}

function continueWar(){
    let modal2 = document.getElementById("modal2")
    let flipButton = document.getElementById("flipBtn")
    let playerCard = playerDeck.pop()
    let computerCard = computerDeck.pop()

    flipButton.style.visibility = "hidden"

    fieldDeck = [computerCard, playerCard]

    for(let i = 0; i < fieldDeck.length; i++){
        if(i === 0){
            let card = document.createElement("div")
            card.classList.add("card")
            card.classList.add("fieldCard")
            card.innerHTML = `
                <p class="cardValue">${playerCard.value}</p>
                <p class="cardSuit">${playerCard.suit}</p>
                <p class="rightPartCard cardSuit">${playerCard.suit}</p>
                <p class="rightPartCard cardValue">${playerCard.value}</p>
            `
            activePlayerCard.textContent = ""
            activePlayerCard.appendChild(card)
        }else if(i === 1){
            let card = document.createElement("div")
            card.classList.add("card")
            card.classList.add("fieldCard")
            card.innerHTML = `
                <p class="cardValue">${computerCard.value}</p>
                <p class="cardSuit">${computerCard.suit}</p>
                <p class="rightPartCard cardSuit">${computerCard.suit}</p>
                <p class="rightPartCard cardValue">${computerCard.value}</p>
            `
            activeComputerCard.textContent = ""
            activeComputerCard.appendChild(card)
        }
    }

    let computerDeckContainer = document.getElementsByClassName("computerDeckContainer")[0]
    let playerDeckContainer = document.getElementsByClassName("playerDeckContainer")[0]

    if(playerCard.value > computerCard.value){
        warDeck.push(...fieldDeck)
        playerDeck.push(...warDeck)
        warDeck.length = 0
        console.log(playerDeck.length)
        console.log(computerDeck.length)
        let whoWins = document.getElementById("whoWins")
        whoWins.textContent = "Player Wins! Cards added to bottom of deck!"

        setTimeout(() =>{
            document.getElementById("flipBtn").style.visibility = "hidden"
            modal2.style.visibility = "visible"
            modal2.style.opacity = "1"
            computerDeckContainer.innerHTML = ""
            playerDeckContainer.innerHTML = ""
            for(let i = 0; i < computerDeck.length; i++){
                let card = document.createElement("div")
                card.classList.add("card")
                card.innerHTML = `
                    Back Of Card
                `
                computerDeckContainer.appendChild(card)
            }
            for(let i = 0; i < playerDeck.length; i++){
                let card = document.createElement("div")
                card.classList.add("card")
                card.innerHTML = `
                    Back Of Card
                `
                playerDeckContainer.appendChild(card)
            }
            hideCards()
            let pile = document.getElementById("warPile")
            if (pile) pile.remove()
            flipButton.onclick = flipCards
            flipButton.textContent = "Flip Card"
            flipButton.classList.remove("newFlipBtn")
            flipButton.classList.add("flipButton")
        }, 2000)

        setTimeout(() =>{
            modal2.style.visibility = "hidden"
            modal2.style.opacity = "0"
            document.getElementById("flipBtn").style.visibility = "visible"
            showCards()
            activeComputerCard.innerHTML = `Active Computer Card`
            activePlayerCard.innerHTML = `Active Player Card`
        }, 4000)

    }else if(computerCard.value > playerCard.value){
        warDeck.push(...fieldDeck)
        computerDeck.push(...warDeck)
        warDeck.length = 0
        console.log(playerDeck.length)
        console.log(computerDeck.length)

        let whoWins = document.getElementById("whoWins")
        whoWins.textContent = "Computer Wins! Cards added to bottom of deck!"
        setTimeout(() =>{
            modal2.style.visibility = "visible"
            modal2.style.opacity = "1"
            computerDeckContainer.innerHTML = ""
            playerDeckContainer.innerHTML = ""
            for(let i = 0; i < computerDeck.length; i++){
                let card = document.createElement("div")
                card.classList.add("card")
                card.innerHTML = `
                    Back Of Card
                `
                computerDeckContainer.appendChild(card)
            }
            for(let i = 0; i < playerDeck.length; i++){
                let card = document.createElement("div")
                card.classList.add("card")
                card.innerHTML = `
                    Back Of Card
                `
                playerDeckContainer.appendChild(card)
            }
            hideCards()
            let pile = document.getElementById("warPile")
            if (pile) pile.remove()
            flipButton.onclick = flipCards
            flipButton.textContent = "Flip Card"
            flipButton.classList.remove("newFlipBtn")
            flipButton.classList.add("flipButton")
        }, 2000)

        setTimeout(() =>{
            modal2.style.visibility = "hidden"
            modal2.style.opacity = "0"
            showCards()
            activeComputerCard.innerHTML = `Active Computer Card`
            activePlayerCard.innerHTML = `Active Player Card`
        }, 4000)
    }else if(computerCard.value === playerCard.value){
        setTimeout(() =>{
            warButton()
            document.getElementById("flipBtn").style.visibility = "hidden"
        }, 2000)
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
    document.getElementById("flipBtn").style.visibility = "hidden"
}

function showCards(){
    let cards = document.getElementsByClassName("card")
    console.log(cards)
    for(let i = 0; i < cards.length; i++){
        cards[i].style.visibility = "visible"
    }
    document.getElementsByClassName("activeComputerCard")[0].style.visibility = "visible"
    document.getElementsByClassName("activePlayerCard")[0].style.visibility = "visible"
    document.getElementById("flipBtn").style.visibility = "visible"
}

function endGame(){
    alert("Game Over")
    container.innerHTML = ``
    document.getElementById("modal").style.visibility = "visible"
}
