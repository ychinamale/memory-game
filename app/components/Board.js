import React, { useEffect, useState } from 'react';
import { Card } from './Card';

const boardImages  = {
    "unflipped" : "images/unflipped.jpg",
    "burger"    : "images/burger.jpg",
    "fries"     : "images/fries.jpg",
    "hotdog"    : "images/hotdog.jpg",
    "icecream"  : "images/icecream.png",
    "milkshake" : "images/milkshake.jpg",
    "pizza"     : "images/pizza.jpg"
}

const cardNames = [ "burger", "fries", "hotdog", "icecream", "milkshake", "pizza" ];

export function Board () {

    const [ cards, setCards ] = useState([]);
    const [ chosen, setChosen ] = useState([]);
    const [ matches, setMatches ] = useState([]);
    const [ disabled, setDisabled ] = useState(false);

    useEffect(() => {
        setCards(randomizeList(createPairs(cardNames)));
    }, []);

    useEffect(() => {
        if ( chosen.length > 1 ){
            if(isMatch()){
                setMatches([ ...matches, ...chosen])
            } else {
                setDisabled(true);
            }
        }
    }, [chosen]);

    useEffect(()=> {
        setTimeout(() => {
            setChosen([]);
            setDisabled(false);
        }, 900);
    }, [disabled]);

    useEffect(() => {
        setChosen([])
    }, [matches]);

    const isMatch = () => boardImages[ cards[chosen[0]]] === boardImages[ cards[chosen[1]]];

    const randomizeList = (thisList) => thisList.sort(() => 0.5 - Math.random());

    const createPairs = (thisList) => {
        return thisList.reduce((acc, item)=>{
            acc.push(item)
            acc.push(item)
            return acc
        }, [])
    }

    const handleFlip = (index) => {
        setChosen([ ...chosen, index]);
    }

    function resetBoard () {
        setChosen([]);
        setMatches([]);
        setCards(randomizeList(createPairs(cardNames)));
    }

    return (
        <div>
            <button onClick={()=> resetBoard()}>Reset Board</button>
            <div className='grid'>
                { cards.map((cardName, index)=> {
                    
                    var isFlipped = (chosen.includes(index) || matches.includes(index));

                    var showImage = isFlipped
                        ? boardImages[ cards[index] ]
                        : boardImages[ 'unflipped' ];

                    return (
                        <Card
                            key={`${cardName}-${index}`}
                            id={index}
                            flipped={ isFlipped }
                            image={ showImage }
                            width={100}
                            height={100}
                            onFlip={ isFlipped || disabled ? 
                                () => console.log('Wise guy -_-') :
                                (card_id) => handleFlip(card_id) 
                            }
                        />
                    );
                })}
            </div>
        </div>
    )
}