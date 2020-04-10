/* possible extension:
    Get random images from unsplash
    Use some CDN to optimize the images (e.g. cloudinary, cloudflare)
    Or some image resizer api - https://img-resize.com/examples
    
    https://app.contentful.com/spaces/t55nbyyaqwhu/onboarding/copy
    is available on
        https://app.contentful.com/spaces/t55nbyyaqwhu/home
*/

const boardImages  = {
    "unflipped" : "images/unflipped.jpg",
    "matched" : "images/matched.jpg",

    "burger"    : "images/burger.jpg",
    "fries"     : "images/fries.jpg",
    "hotdog"    : "images/hotdog.jpg",
    "icecream"  : "images/icecream.png",
    "milkshake" : "images/milkshake.jpg",
    "pizza"     : "images/pizza.jpg"
}

const matchList = [ "burger", "fries", "hotdog", "icecream", "milkshake", "pizza" ];

let cardList = [];

const numMatches = matchList.length * 2;

let cardsChosen_ID = [];
let cardsChosen_Name = [];

// creating the game board
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
    console.log(cardList)
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
        } else if (kind == "hit") {
            image = boardImages["matched"];
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
    console.log('disable called')
    document.querySelectorAll('img').forEach((node)=>{
        if (node.getAttribute('data-id') == id){
            node.removeEventListener('click', flipCard);
        }
    });
}

function flipCard(){
    console.log('clicked!')
    var cardID = this.getAttribute('data-id');
    var cardName = cardList[cardID];
    //var cardImage = boardImages[cardName];

    // add to chosen cards
    cardsChosen_ID.push(cardID);
    cardsChosen_Name.push(cardName)

    // show chosen cards
    showCards("default")

    // if cardsChosen has 2 cards, show card and check match
    if(cardsChosen_ID.length > 1){
        setTimeout(() => {
            // check match
            //      if card 1 == card 2
            //          increase matched[], remove eventlistener, show alert, show white
            //          if matched[] == 12, show "Congratulations"
            //      if card 1 != card 2
            //          show sorry, show blank, clear cardsChosen        
            if(isMatch()){
                cardsChosen_ID.map((id)=>{
                    disableChosen(id);
                })
                //showCards("hit");
            } else {
                showCards("miss");
            }

            cardsChosen_ID = []
            cardsChosen_Name = []

            console.log("Your chosen files are now ", cardsChosen_ID);
        }, 1000);
    }

    
}

initializeBoard();



/*
document.addEventListener("DOMContentLoaded", ()=>{

})*/