/* 
    Extension:
    - Add better styling
    - Slap react on it
		- Consider animations? https://reactjs.org/docs/faq-styling.html
    - Slap ElectronJs
    - Get random images from unsplash
        - Consider CDN e.g. cloudinary, cloudflare
        - Consider contentful CDN
            - https://app.contentful.com/spaces/t55nbyyaqwhu/home
            - https://app.contentful.com/spaces/t55nbyyaqwhu/onboarding/copy
        - Consider image resizer api e.g. https://img-resize.com/examples    
*/

const boardImages  = {
    "unflipped" : "images/unflipped.jpg",
    "burger"    : "images/burger.jpg",
    "fries"     : "images/fries.jpg",
    "hotdog"    : "images/hotdog.jpg",
    "icecream"  : "images/icecream.png",
    "milkshake" : "images/milkshake.jpg",
    "pizza"     : "images/pizza.jpg"
}

const matchList = [ "burger", "fries", "hotdog", "icecream", "milkshake", "pizza" ];

let cardList = [];

let cardsChosen_ID = [];
let cardsChosen_Name = [];

let matchesFound = 0;

const grid = document.querySelector('#grid');

function createCard(name, id){
    var card = document.createElement('img');
    card.setAttribute('src', boardImages[name]);
    card.setAttribute('data-id', id);
    return card; 
}

function createPairs(cardList){
    return cardList.reduce((acc, item)=>{
        acc.push(item)
        acc.push(item)
        return acc
    }, [])
}

function randomizeList(thisList){
    return thisList.sort(() => 0.5 - Math.random());
}

function initializeBoard(){

    cardList = randomizeList(createPairs(matchList));
    for (let id=0; id < cardList.length; id++){
        var card = createCard( "unflipped", id);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

function getImageWithID(id){
    let result;
    document.querySelectorAll('img').forEach((node)=>{
        if (node.getAttribute('data-id') == id){
            result = node;
        }
    });
    return result;
}

function showCards(kind){
    let image;

    cardsChosen_ID.map((id, index)=>{
        if(kind == "miss"){
            image = boardImages["unflipped"];
        } else {
            image = boardImages[cardsChosen_Name[index]];
        }
        getImageWithID(id).setAttribute('src', image);
    })
}

function isMatch(){
    return (cardsChosen_Name[0] == cardsChosen_Name[1]);
}


function disableChosen(id){
    document.querySelectorAll('img').forEach((node)=>{
        if (node.getAttribute('data-id') == id){
            node.removeEventListener('click', flipCard);
        }
    });
}

function resetGame(){
    cardsChosen_ID = [];
    cardsChosen_Name = [];
    matchesFound = 0;
    document.querySelectorAll('img').forEach((node)=>{
        node.setAttribute("src", boardImages["unflipped"]);
    })
}

function updateMatchCounter(){
    document.querySelector('#counter').innerText = `Found: ${matchesFound}`;
}

function endGame(){
    document.querySelector('#counter').innerText = "You won!!!";
}

function flipCard(){
    var cardID = this.getAttribute('data-id');
    var cardName = cardList[cardID];

    cardsChosen_ID.push(cardID);
    cardsChosen_Name.push(cardName)

    showCards("default")

    if(cardsChosen_ID.length > 1){
        setTimeout(() => {       
            if(isMatch()){
                matchesFound += 2;
                updateMatchCounter();
                cardsChosen_ID.map((id)=>{
                    disableChosen(id);
                })
            } else {
                showCards("miss");
            }

            cardsChosen_ID = []
            cardsChosen_Name = []

            if (matchesFound == cardList.length){
                endGame();
            }
        }, 650);
    }
}

initializeBoard();