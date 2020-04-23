import React from 'react';
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

const matchList = [ "burger", "fries", "hotdog", "icecream", "milkshake", "pizza" ];

/*


*/


export class Board extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            chosen_ids: [],
            chosen_images: [],
            matchesFound: 0
        }

        this.handleFlip = this.handleFlip.bind(this);
    }

    handleFlip (id, image) {
        if (chosen_ids.length > 1){
            if(isMatch()){
                this.setState(({ matchesFound })=>({
                    matchesFound: matchesFound + 2
                }))
            } else {
                this.setState({
                    chosen_ids: [],
                    chosen_images: []
                })
            }
        }
    }

    render() {
        const { chosen_ids } = this.state;
        return (
            <React.Fragment>
                { matchList.map((imageName, index)=> {
                    if (chosen_ids.includes(index)) {
                        return <Card key={`${imageName}-${index}`} id={index} show={true} />
                    }
                    
                    return <Card key={`${imageName}-${index}`} id={index} show={false} />
                })}
            </React.Fragment>
        )
    }
}