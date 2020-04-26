import React from 'react';
import PropTypes from 'prop-types';

export function Card (props) {

    const { id, flipped, image, width, height, onFlip } = props;

    return (
        <div 
            className={`flip-container ${ flipped ? 'flipped' : '' }`}
            style={ {width, height} }
            onClick={ ()=> onFlip(id)}
        >
            <div className='flipper'>
                <img
                    style={ {width, height} }
                    className={ flipped? 'front': 'back' }
                    src={ image }
                />
            </div>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    flipped: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onFlip: PropTypes.func.isRequired
}