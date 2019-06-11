import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Sales = ({ description, name }) => (
    <div className="homesale">
        <div className="homesale__sale">
            <Link className="homesale__picture" to="/sales/nina-ricci-na-14-marta/">
                <picture className="homesale__image">
                    <img className="homesale__image-img" src="https://placehold.it/290x290" alt="" />
                </picture>
                <h3 className="homesale__label-head">{name}</h3>
                <div className="homesale__label">
                    <span className="homesale__label-text">{description}</span>
                </div>
            </Link>
        </div>
    </div>
);

Sales.defaultProps = {
    name: 'Без именни',
    description: 'test',
};

Sales.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Sales;
