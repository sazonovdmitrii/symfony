import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.css';

const SaleCard = ({ name, description, image, url }) => (
    <div className={styles.root}>
        <Link className={styles.inner} to={url}>
            <picture className={styles.imageWrapper}>
                <img className={styles.image} src={image || 'https://placehold.it/240x290'} alt="" />
            </picture>
            <h3 className={styles.title}>{name}</h3>
            <div className={styles.textRight}>
                <span className={styles.description}>{description}</span>
            </div>
        </Link>
    </div>
);

SaleCard.defaultProps = {
    name: 'Без именни',
    description: 'test',
};

SaleCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default SaleCard;
