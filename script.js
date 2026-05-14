// Global variables for making the deck
// Full deck before cards are dealt
let deck = []

// Card suits used to build the deck
let suits = ["♠️", "♣️", "♥️", "♦️"]

// Card values (11=J, 12=Q, 13=K, 14=A)
let value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// Player's active deck
let playerDeck = []

// Computer's active deck
let computerDeck = []

// Cards currently on the battlefield
let fieldDeck = []

// Cards stored during a war round
let warDeck = []

// HTML element for center pile
let pile = document.getElementById("cardPile")

// Main container element
let container = document.getElementById("container")

// War button element
let warBtn = document.getElementById("warBtn")

// main function that starts the game
function startGame(){

    // Create all 52 cards
    createDeck()

    // Hide opening modal
    document.getElementById("modal").style.visibility = "hidden"
    document.getElementById("modal").style.opacity = "0"

    // Shuffle deck multiple times
    shuffleDeck(deck)
    shuffleDeck(deck)
    shuffleDeck(deck)

    // Build visual deck pile
    deckPile()

    // Show pile on screen
    pile.style.opacity = "1"
    pile.style.visibility = "visible"
}

// Creates the full deck of cards
function createDeck(){

    // Loop through suits
    for(let i = 0; i < suits.length; i++){

        // Loop through values
        for(let j = 0; j < value.length; j++){

            // Create card object
            let card = {
                value: value[j],
                suit: suits[i]
            }

            // Add card to deck
            deck.push(card)
        }
    }

    // Debug deck in console
    console.log(deck)
}

// Randomly shuffles an array using Fisher-Yates
function shuffleDeck(array) {
    let currentIndex = array.length, randomIndex;

    // Continue until no cards remain
    while (currentIndex !== 0) {

    // Pick random card index
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap positions
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
    ];
    }

    return array;
}

// Creates the visual stack of deck cards
function deckPile(){

    // One backside card for each card in deck
    for(let i = 0; i < deck.length; i++){

        let card = document.createElement("div")

        // Add backside styling
        card.classList.add("backsideCards")
        card.innerHTML = ``
        
        
        // Add to pile element
        pile.appendChild(card)
    }
}

// Deals cards to player and computer
function dealHands(){

    // Remove dealer/start button
    document.getElementById("dealer").remove()

    // Select all visual deck cards
    card = document.getElementsByClassName("backsideCards")

    // Animate cards being dealt alternately
    for(let i = 0; i < card.length; i++){
        if(i % 2 === 0){
            card[i].classList.add("dealPlayerCard")
        }else{
            card[i].classList.add("dealComputerCard")
        }
    }

    setTimeout(() => {
        
        // Remove animations after dealing
        for(let i = 0; i < card.length; i++){
            if(i % 2 === 0){
            card[i].classList.remove("dealPlayerCard")
            }else{
                card[i].classList.remove("dealComputerCard")
            }
        }

        // Clear center pile
        pile.innerHTML = ``

        let i = 0

        // Split deck evenly between players
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
        
        // Create flip button
        let flipButton = document.createElement("button")
        flipButton.style.visibility = "hidden"
        flipButton.style.opacity = "0"

        // Create computer deck container
        let computerDeckContainer = document.createElement("div")
        computerDeckContainer.style.visibility = "hidden"
        computerDeckContainer.style.opacity = "0"

        // Create player deck container
        let playerDeckContainer = document.createElement("div")
        playerDeckContainer.style.visibility = "hidden"
        playerDeckContainer.style.opacity = "0"

        // Create deck count displays
        let playerCount = document.createElement("div")
        let computerCount = document.createElement("div")
        playerCount.id = "playerCount"
        computerCount.id = "computerCount"
        playerCount.classList.add("deckCount")
        computerCount.classList.add("deckCount")
        container.appendChild(computerCount)
        container.appendChild(playerCount)  

        // Add CSS classes
        flipButton.classList.add("flipButton")
        playerDeckContainer.classList.add("playerDeckContainer")
        computerDeckContainer.classList.add("computerDeckContainer")

        // Add elements to page
        container.appendChild(computerDeckContainer)
        container.appendChild(flipButton)
        container.appendChild(playerDeckContainer)

        // Render computer deck visually
        for(let i = 0; i < computerDeck.length; i++){
            let card = document.createElement("div")
            card.classList.add("backsideCards")
            card.innerHTML = ``
            computerDeckContainer.appendChild(card)
        }

        // Render player deck visually
        for(let i = 0; i < playerDeck.length; i++){
            let card = document.createElement("div")
            card.classList.add("backsideCards")
            card.innerHTML = ``
            playerDeckContainer.appendChild(card)
        }
        
        // Create active player display area
        let activePlayerCard = document.createElement("div")
        activePlayerCard.style.visibility = "hidden"
        activePlayerCard.style.opacity = "0"

        // Create active computer display area
        let activeComputerCard = document.createElement("div")
        activeComputerCard.style.visibility = "hidden"
        activeComputerCard.style.opacity = "0"

        // Add classes and IDs
        activePlayerCard.classList.add("activePlayerCard")
        activeComputerCard.classList.add("activeComputerCard")
        activePlayerCard.id = "activePlayerCard"
        activeComputerCard.id = "activeComputerCard"

        // Add to page
        container.appendChild(activeComputerCard)
        container.appendChild(activePlayerCard)
        
        // Reveal all UI elements
        flipButton.style.visibility = "visible"
        flipButton.style.opacity = "1"
        computerDeckContainer.style.visibility = "visible"
        computerDeckContainer.style.opacity = "1"
        playerDeckContainer.style.visibility = "visible"
        playerDeckContainer.style.opacity = "1"
        activePlayerCard.style.visibility = "visible"
        activePlayerCard.style.opacity = "1"
        activeComputerCard.style.visibility = "visible"
        activeComputerCard.style.opacity = "1"
        playerCount.style.visibility = "visible"
        computerCount.style.visibility = "visible"
        playerCount.style.opacity = "1"
        computerCount.style.opacity = "1"

        // Debug decks
        console.log(computerDeck)
        console.log(playerDeck)

        // Update deck counters
        updateCount()

        // Placeholder text
        activeComputerCard.textContent = "Active Computer Card"
        activePlayerCard.textContent = "Active Player Card"

        // Configure flip button
        flipButton.textContent = "Flip Cards"
        flipButton.id = "flipBtn"
        flipButton.onclick = flipCards

    }, 1250);
}

function flipCards(){
    if(playerDeck.length < 1 || computerDeck.length < 1){
        endGame()
        return
    }

    let activePlayerCard = document.getElementById("activePlayerCard")
    let activeComputerCard = document.getElementById("activeComputerCard")
    activeComputerCard.style.visibility = "hidden"
    activeComputerCard.style.opacity = "0"
    activePlayerCard.style.visibility = "hidden"
    activePlayerCard.style.opacity = "0"
    document.getElementById("playerCount").style.visibility = "hidden"
    document.getElementById("computerCount").style.visibility = "hidden"
    document.getElementById("playerCount").style.opacity = "0"
    document.getElementById("computerCount").style.opacity = "0"
    document.getElementById("flipBtn").style.visibility = "hidden"
    document.getElementById("flipBtn").style.opacity = "0"
    document.getElementById("flipBtn").textContent = "Flip Cards"
    let playerCard = playerDeck.pop()
    let computerCard = computerDeck.pop()
    updateCount()

    fieldDeck = [computerCard, playerCard]

    let computerDeckContainer = document.getElementsByClassName("computerDeckContainer")[0]
    let playerDeckContainer = document.getElementsByClassName("playerDeckContainer")[0]
    
    computerDeckContainer.classList.add("flipComputerCard")
    playerDeckContainer.classList.add("flipPlayerCard") 

    setTimeout(() => {
        // Show active computer card area
        activeComputerCard.style.visibility = "visible"
        activeComputerCard.style.opacity = "1"

        // Show active player card area
        activePlayerCard.style.visibility = "visible"
        activePlayerCard.style.opacity = "1"

        // Clear old deck visuals
        computerDeckContainer.innerHTML = ``
        playerDeckContainer.innerHTML = ``

        // Rebuild computer deck display
        for(let i = 0; i < computerDeck.length; i++){
            let card = document.createElement("div")
            card.classList.add("backsideCards")
            card.innerHTML = ``
            computerDeckContainer.appendChild(card)
        }

        // Rebuild player deck display
        for(let i = 0; i < playerDeck.length; i++){
            let card = document.createElement("div")
            card.classList.add("backsideCards")
            card.innerHTML = ``
            playerDeckContainer.appendChild(card)
        }

        // Round result modal
        let modal2 = document.getElementById("modal2")

        // Debug current field cards
        console.log(fieldDeck)


        // Display both flipped cards
        for(let i = 0; i < fieldDeck.length; i++){

            // Player card
            if(i === 0){
                let displayValue = checkCardValue(fieldDeck[1].value)
                let card = document.createElement("div")
                card.classList.add("card")
                card.classList.add("fieldCard")
                card.innerHTML = `
                    <p class="cardValue">${displayValue}</p>
                    <p class="cardSuit">${fieldDeck[1].suit}</p>
                    <p class="rightPartCard cardSuit">${fieldDeck[1].suit}</p>
                    <p class="rightPartCard cardValue">${displayValue}</p>
                `

                activePlayerCard.textContent = ""
                activePlayerCard.appendChild(card)

            // Computer card
            }else if(i === 1){
                let displayValue = checkCardValue(fieldDeck[0].value)
                let card = document.createElement("div")
                card.classList.add("card")
                card.classList.add("fieldCard")
                card.innerHTML = `
                    <p class="cardValue">${displayValue}</p>
                    <p class="cardSuit">${fieldDeck[0].suit}</p>
                    <p class="rightPartCard cardSuit">${fieldDeck[0].suit}</p>
                    <p class="rightPartCard cardValue">${displayValue}</p>
                `
                
                activeComputerCard.textContent = ""
                activeComputerCard.appendChild(card)
            }
        }

        // Player wins round
        if(fieldDeck[1].value > fieldDeck[0].value){
            let whoWins = document.getElementById("whoWins")

            for(let i = 0; i < fieldDeck.length; i++){
                playerDeck.unshift(fieldDeck[i])
            }

            if(playerDeck.length < 1 || computerDeck.length < 1){
                endGame()
                return
            }

            whoWins.textContent = "Player Wins This Round!"
            fieldDeck.length = 0

            setTimeout(() =>{
                computerDeckContainer.classList.remove("flipComputerCard")
                playerDeckContainer.classList.remove("flipPlayerCard")
                shuffleDeck(computerDeck)
                shuffleDeck(playerDeck)

                modal2.style.visibility = "visible"
                modal2.style.opacity = "1"
                hideCards()
            }, 1000)

            setTimeout(() =>{
                updateCount()
                modal2.style.visibility = "hidden"
                modal2.style.opacity = "0"
                showCards()
                activeComputerCard.innerHTML = `Active Computer Card`
                activePlayerCard.innerHTML = `Active Player Card`
                document.getElementById("flipBtn").style.visibility = "visible"
                document.getElementById("flipBtn").style.opacity = "1"
                document.getElementById("playerCount").style.visibility = "visible"
                document.getElementById("computerCount").style.visibility = "visible"
                document.getElementById("playerCount").style.opacity = "1"
                document.getElementById("computerCount").style.opacity = "1"
            }, 2000)

        // Computer wins round
        } else if(fieldDeck[0].value > fieldDeck[1].value){
            let whoWins = document.getElementById("whoWins")

            for(let i = 0; i < fieldDeck.length; i++){
                computerDeck.unshift(fieldDeck[i])
            }

            if(playerDeck.length < 1 || computerDeck.length < 1){
                endGame()
                return
            }

            whoWins.textContent = "Computer Wins This Round!"
            fieldDeck.length = 0

            setTimeout(() =>{
                computerDeckContainer.classList.remove("flipComputerCard")
                playerDeckContainer.classList.remove("flipPlayerCard")
                shuffleDeck(computerDeck)
                shuffleDeck(playerDeck)
                modal2.style.visibility = "visible"
                modal2.style.opacity = "1"
                hideCards()
            }, 1000)

            setTimeout(() =>{
                updateCount()
                modal2.style.visibility = "hidden"
                modal2.style.opacity = "0"
                showCards()
                activeComputerCard.innerHTML = `Active Computer Card`
                activePlayerCard.innerHTML = `Active Player Card`
                document.getElementById("flipBtn").style.visibility = "visible"
                document.getElementById("flipBtn").style.opacity = "1"
                document.getElementById("playerCount").style.visibility = "visible"
                document.getElementById("computerCount").style.visibility = "visible"
                document.getElementById("playerCount").style.opacity = "1"
                document.getElementById("computerCount").style.opacity = "1"
            }, 2000)

            // Tie triggers war
            }else if(fieldDeck[0].value === fieldDeck[1].value){
                setTimeout(() =>{
                    warButton()
                }, 2000)
            }

    // Debug deck counts
    console.log(playerDeck.length)
    console.log(computerDeck.length)
    }, 725);
}

function warButton(){
    // If either player lacks cards for war, end game
    if(playerDeck.length < 4 || computerDeck.length < 4){
        endGame()
        return
    }

    // Update counters
    updateCount()

    // Remove flip animations
    document.getElementsByClassName("computerDeckContainer")[0].classList.remove("flipComputerCard")
    document.getElementsByClassName("playerDeckContainer")[0].classList.remove("flipPlayerCard")

    // Hide interface temporarily
    document.getElementById("flipBtn").style.visibility = "hidden"
    document.getElementById("flipBtn").style.opacity = "0"
    document.getElementById("playerCount").style.visibility = "hidden"
    document.getElementById("computerCount").style.visibility = "hidden"
    document.getElementById("playerCount").style.opacity = "0"
    document.getElementById("computerCount").style.opacity = "0"

    // Show war modal
    document.getElementById("modal3").style.visibility = "visible"
    document.getElementById("modal3").style.opacity = "1"

    // Show war button
    warBtn.style.visibility = "visible"
    warBtn.style.opacity = "1"

    // Hide cards
    hideCards()

    document.getElementById("activePlayerCard").style.visibility = "hidden"
    document.getElementById("activeComputerCard").style.visibility = "hidden"
    document.getElementById("cardPile").style.visibility = "hidden"

    // Start war on click
    warBtn.onclick = war
}

function war(){
    // Not enough cards = game over
    if(playerDeck.length < 4 || computerDeck.length < 4){
        endGame()
        return
    }

    // Update counts
    updateCount()

    // Get flip button
    let flipButton = document.getElementById("flipBtn")
    // Show flip button again
    flipButton.style.visibility = "visible" 
    flipButton.style.opacity = "1"

    // Show deck counters
    document.getElementById("playerCount").style.visibility = "visible"
    document.getElementById("computerCount").style.visibility = "visible"
    document.getElementById("playerCount").style.opacity = "1"
    document.getElementById("computerCount").style.opacity = "1"

    // Hide war modal
    document.getElementById("modal3").style.visibility = "hidden"
    document.getElementById("modal3").style.opacity = "0"

    // Hide war button
    warBtn.style.visibility = "hidden"
    warBtn.style.opacity = "0"

    // Reveal cards
    showCards()

    // Move tied field cards into war pile data
    warDeck.push(...fieldDeck)
    fieldDeck.length = 0    

        
    // Find or create war pile display
    let warPile = document.getElementById("warPile")
    if (!warPile) {
        warPile = document.createElement("div")
        warPile.classList.add("warPile")
        warPile.id = "warPile"
        container.appendChild(warPile)
    } else {
        warPile.innerHTML = "" // reset display if needed
    }

    // Add 3 facedown computer cards
    for(let i = 0; i < 3; i++){
        warDeck.push(computerDeck.pop())
    }

    // Add 3 facedown player cards
    for(let i = 0; i < 3; i++){
        warDeck.push(playerDeck.pop())
    }

    // Refresh counters
    updateCount()

    // Deck containers
    let computerDeckContainer = document.getElementsByClassName("computerDeckContainer")[0]
    let playerDeckContainer = document.getElementsByClassName("playerDeckContainer")[0]

    // Clear visual decks
    computerDeckContainer.innerHTML = ""
    playerDeckContainer.innerHTML = ""

    // Rebuild computer deck
    for(let i = 0; i < computerDeck.length; i++){
        let card = document.createElement("div")
        card.classList.add("backsideCards")
        card.innerHTML = ``
        computerDeckContainer.appendChild(card)
    }

    // Rebuild player deck
    for(let i = 0; i < playerDeck.length; i++){
        let card = document.createElement("div")
        card.classList.add("backsideCards")
        card.innerHTML = ``
        playerDeckContainer.appendChild(card)
    }

    // Debug remaining decks
    console.log(playerDeck)
    console.log(computerDeck)

    // Render war pile cards
    for(let i = 0; i < warDeck.length; i++){
        let card = document.createElement("div")
        let displayValue = checkCardValue(warDeck[i].value)
        card.classList.add("card")
        card.innerHTML = `
            <p class="cardValue">${displayValue}</p>
            <p class="cardSuit">${warDeck[i].suit}</p>
            <p class="rightPartCard cardSuit">${warDeck[i].suit}</p>
            <p class="rightPartCard cardValue">${displayValue}</p>
        `
        warPile.appendChild(card)
    }

    // Debug war pile
    console.log(warDeck)

    // Reset active card labels
    activeComputerCard.innerHTML = "Active Computer Card"
    activePlayerCard.innerHTML = "Active Player Card"

    // Change flip button style for war
    flipButton.classList.remove("flipButton")
    flipButton.classList.add("newFlipBtn")
    flipButton.style.visibility = "visible"
    flipButton.style.opacity = "1"
    flipButton.textContent = "Flip Next Card"

    // Next click continues war
    flipButton.onclick = continueWar
}

function continueWar(){
    // Update deck counts
    updateCount()

    // Get active display areas
    let activePlayerCard = document.getElementById("activePlayerCard")
    let activeComputerCard = document.getElementById("activeComputerCard")

    // Hide active cards before animation
    activeComputerCard.style.visibility = "hidden"
    activeComputerCard.style.opacity = "0"
    activePlayerCard.style.visibility = "hidden"
    activePlayerCard.style.opacity = "0"

    // Get modal and button
    let modal2 = document.getElementById("modal2")
    let flipButton = document.getElementById("flipBtn")

    // Draw top cards
    let playerCard = playerDeck.pop()
    let computerCard = computerDeck.pop()

    // Animate decks forward
    document.getElementsByClassName("computerDeckContainer")[0].classList.add("flipComputerCard")
    document.getElementsByClassName("playerDeckContainer")[0].classList.add("flipPlayerCard")

    // Hide button and counters
    flipButton.style.visibility = "hidden"
    flipButton.style.opacity = "0"
    document.getElementById("playerCount").style.visibility = "hidden"
    document.getElementById("computerCount").style.visibility = "hidden"
    document.getElementById("playerCount").style.opacity = "0"
    document.getElementById("computerCount").style.opacity = "0"

    // Put cards in field deck
    fieldDeck = [computerCard, playerCard]

    setTimeout(() => {

    // Show active areas
    activeComputerCard.style.visibility = "visible"
    activeComputerCard.style.opacity = "1"
    activePlayerCard.style.visibility = "visible"
    activePlayerCard.style.opacity = "1"

    // Render compared cards
    for(let i = 0; i < fieldDeck.length; i++){
        if(i === 0){
            let card = document.createElement("div")
            let displayValue = checkCardValue(fieldDeck[1].value)
            card.classList.add("card", "fieldCard")
            card.innerHTML = `
                <p class="cardValue">${displayValue}</p>
                <p class="cardSuit">${playerCard.suit}</p>
                <p class="rightPartCard cardSuit">${playerCard.suit}</p>
                <p class="rightPartCard cardValue">${displayValue}</p>
            `
            activePlayerCard.textContent = ""
            activePlayerCard.appendChild(card)

        } else if(i === 1){
            let card = document.createElement("div")
            let displayValue = checkCardValue(fieldDeck[0].value)
            card.classList.add("card", "fieldCard")
            card.innerHTML = `
                <p class="cardValue">${displayValue}</p>
                <p class="cardSuit">${computerCard.suit}</p>
                <p class="rightPartCard cardSuit">${computerCard.suit}</p>
                <p class="rightPartCard cardValue">${displayValue}</p>
            `
            activeComputerCard.textContent = ""
            activeComputerCard.appendChild(card)
            }
        }
        showCards()
        flipButton.style.visibility = "hidden"
        flipButton.style.opacity = "0"
    }, 725);

    // redefine container
    let computerDeckContainer = document.getElementsByClassName("computerDeckContainer")[0]
    let playerDeckContainer = document.getElementsByClassName("playerDeckContainer")[0]

    // if the players card is higher than the computer card
    if(playerCard.value > computerCard.value){
        warDeck.push(...fieldDeck)
        playerDeck.push(...warDeck)
        warDeck.length = 0
        console.log(playerDeck.length)
        console.log(computerDeck.length)
        let whoWins = document.getElementById("whoWins")
        whoWins.textContent = "Player Wins This Round!"

        // flip the card
        setTimeout(() =>{
            updateCount()
            document.getElementById("flipBtn").style.visibility = "hidden"
            document.getElementById("flipBtn").style.opacity = "0"
            modal2.style.visibility = "visible"
            modal2.style.opacity = "1"
            computerDeckContainer.classList.remove("flipComputerCard")
            playerDeckContainer.classList.remove("flipPlayerCard")
            computerDeckContainer.innerHTML = ""
            playerDeckContainer.innerHTML = ""
            //make the back of the cards again
            for(let i = 0; i < computerDeck.length; i++){
                let card = document.createElement("div")
                card.classList.add("backsideCards")
                card.innerHTML = ``
                computerDeckContainer.appendChild(card)
            }
            for(let i = 0; i < playerDeck.length; i++){
                let card = document.createElement("div")
                card.classList.add("backsideCards")
                card.innerHTML = ``
                playerDeckContainer.appendChild(card)
            }
            hideCards()
            let pile = document.getElementById("warPile")
            if (pile) pile.remove()
            flipButton.onclick = flipCards
            flipButton.textContent = "Flip Card"
            flipButton.classList.remove("newFlipBtn")
            flipButton.classList.add("flipButton")
            // if a player runs out of cards, end game
            if(playerDeck.length < 1 || computerDeck.length < 1){
                endGame()
                return
            }
        }, 2000)

        // finish the modal and get ready for another flip
        setTimeout(() =>{
            updateCount()
            modal2.style.visibility = "hidden"
            modal2.style.opacity = "0"
            document.getElementById("flipBtn").style.visibility = "visible"
            document.getElementById("flipBtn").style.opacity = "1"
            document.getElementById("playerCount").style.visibility = "visible"
            document.getElementById("computerCount").style.visibility = "visible"
            document.getElementById("playerCount").style.opacity = "1"
            document.getElementById("computerCount").style.opacity = "1"
            showCards()
            activeComputerCard.innerHTML = `Active Computer Card`
            activePlayerCard.innerHTML = `Active Player Card`
        }, 3000)
        updateCount()
    // if the computers card is higher than the players card
    }else if(computerCard.value > playerCard.value){
        // update decks
        updateCount()
        warDeck.push(...fieldDeck)
        computerDeck.push(...warDeck)
        warDeck.length = 0
        console.log(playerDeck.length)
        console.log(computerDeck.length)

        let whoWins = document.getElementById("whoWins")
        whoWins.textContent = "Computer Wins This Round!"
        // display who wins the round
        setTimeout(() =>{
            modal2.style.visibility = "visible"
            modal2.style.opacity = "1"
            computerDeckContainer.classList.remove("flipComputerCard")
            playerDeckContainer.classList.remove("flipPlayerCard")
            computerDeckContainer.innerHTML = ""
            playerDeckContainer.innerHTML = ""
            // make the back of the cards again
            for(let i = 0; i < computerDeck.length; i++){
                let card = document.createElement("div")
                card.classList.add("backsideCards")
                card.innerHTML = ``
                computerDeckContainer.appendChild(card)
            }
            for(let i = 0; i < playerDeck.length; i++){
                let card = document.createElement("div")
                card.classList.add("backsideCards")
                card.innerHTML = ``
                playerDeckContainer.appendChild(card)
            }
            hideCards()
            // make sure there are no duplications of the warpile
            let pile = document.getElementById("warPile")
            if (!pile) {
                pile = document.createElement("div")
                pile.classList.add("warPile")
                pile.id = "warPile"
                container.appendChild(pile)
            } else {
                pile.innerHTML = ""
            }
            flipButton.onclick = flipCards
            flipButton.textContent = "Flip Card"
            flipButton.classList.remove("newFlipBtn")
            flipButton.classList.add("flipButton")
            // if someone runs out of cards end the game
            if(playerDeck.length < 1 || computerDeck.length < 1){
                endGame()
                return
            }
        }, 2000)

        setTimeout(() =>{
            updateCount()
            // get ready for another round
            modal2.style.visibility = "hidden"
            modal2.style.opacity = "0"
            document.getElementById("playerCount").style.visibility = "visible"
            document.getElementById("computerCount").style.visibility = "visible"
            document.getElementById("playerCount").style.opacity = "1"
            document.getElementById("computerCount").style.opacity = "1"        
            showCards()
            activeComputerCard.innerHTML = `Active Computer Card`
            activePlayerCard.innerHTML = `Active Player Card`
        }, 3000)
        updateCount()
        
        // if both cards are the same value
    }else if(computerCard.value === playerCard.value){
        warDeck.push(...fieldDeck)

    let activeComputerCard = document.getElementById("activeComputerCard")
    let activePlayerCard = document.getElementById("activePlayerCard")

    // RENDER FIRST
    let playerDisplay = checkCardValue(playerCard.value)
    let computerDisplay = checkCardValue(computerCard.value)

    activePlayerCard.innerHTML = `
        <div class="card fieldCard">
            <p class="cardValue">${playerDisplay}</p>
            <p class="cardSuit">${playerCard.suit}</p>
            <p class="rightPartCard cardSuit">${playerCard.suit}</p>
            <p class="rightPartCard cardValue">${playerDisplay}</p>
        </div>
    `

    activeComputerCard.innerHTML = `
        <div class="card fieldCard">
            <p class="cardValue">${computerDisplay}</p>
            <p class="cardSuit">${computerCard.suit}</p>
            <p class="rightPartCard cardSuit">${computerCard.suit}</p>
            <p class="rightPartCard cardValue">${computerDisplay}</p>
        </div>
    `

    // THEN clear it
    fieldDeck.length = 0

    setTimeout(() => {
        warButton()
    }, 1500)
    }
}

// function to be called to hide the cards
function hideCards(){
    let cards = document.getElementsByClassName("card")
    let backsideCards = document.getElementsByClassName("backsideCards")
    console.log(cards)
    for(let i = 0; i < cards.length; i++){
        cards[i].style.visibility = "hidden"
        cards[i].style.opacity = "0"
    }
    for(let i = 0; i < backsideCards.length; i++){
        backsideCards[i].style.visibility = "hidden"
        backsideCards[i].style.opacity = "0"
    }
    document.getElementsByClassName("activeComputerCard")[0].style.opacity = "0"
    document.getElementsByClassName("activePlayerCard")[0].style.opacity = "0"
    document.getElementById("flipBtn").style.opacity = "0"
    document.getElementsByClassName("activeComputerCard")[0].style.visibility = "hidden"
    document.getElementsByClassName("activePlayerCard")[0].style.visibility = "hidden"
    document.getElementById("flipBtn").style.visibility = "hidden"
}

// function to be called to show the cards
function showCards(){
    let cards = document.getElementsByClassName("card")
    let backsideCards = document.getElementsByClassName("backsideCards")
    console.log(cards)
    for(let i = 0; i < cards.length; i++){
        cards[i].style.visibility = "visible"
        cards[i].style.opacity = "1"
    }
    for(let i = 0; i < backsideCards.length; i++){
        backsideCards[i].style.visibility = "visible"
        backsideCards[i].style.opacity = "1"
    }
    document.getElementsByClassName("activeComputerCard")[0].style.opacity = "1"
    document.getElementsByClassName("activePlayerCard")[0].style.opacity = "1"
    document.getElementById("flipBtn").style.opacity = "1"
    document.getElementsByClassName("activeComputerCard")[0].style.visibility = "visible"
    document.getElementsByClassName("activePlayerCard")[0].style.visibility = "visible"
    document.getElementById("flipBtn").style.visibility = "visible"
}

// function to reassign the value to its specific letter
function checkCardValue(value){
    if(value === 11) return "J"
    if(value === 12) return "Q"
    if(value === 13) return "K"
    if(value === 14) return "A"
    return value
}

// function to update the counters
function updateCount(){
    document.getElementById("playerCount").textContent = `Player: ${playerDeck.length} Cards`
    document.getElementById("computerCount").textContent = `Computer: ${computerDeck.length} Cards`
}

// function to end the game and reload the page.
function endGame(){
    hideCards()
    let whoWins = document.getElementById("whoWins")

    modal2.style.height = "100%"
    document.getElementById("modalContainer2").style.height = "auto"

    if(computerDeck.length < 4 && playerDeck.length > 4){
        whoWins.textContent = "Player Wins! Computer ran out of cards!"
        modal2.style.visibility = "visible"
        modal2.style.opacity = "1"
    }else if(playerDeck.length < 4 && computerDeck.length > 4){
        whoWins.textContent = "Computer Wins! Player ran out of cards!"
        modal2.style.visibility = "visible"
        modal2.style.opacity = "1"
    }else if(computerDeck.length < 4 && playerDeck.length < 4){
        whoWins.textContent = "You did the impossible!! It's a draw!"
        modal2.style.visibility = "visible"
        modal2.style.opacity = "1"
    }else{
        alert("error")
    }

    setTimeout(() => {
        location.reload()
    }, 2000);
}
