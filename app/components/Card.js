import React from 'react';
import PropTypes from 'prop-types';

export class Card extends React.Component {
    render() {
        const { id, show } = this.props;

        if (show) {
            return (
                <React.Fragment>
                    xCard#{id} <br/>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                Card #{id} <br/>
            </React.Fragment>
        )
    }
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired
}