import React from 'react';
import PropTypes from 'prop-types';

import Arrow from './Arrow';

import styles from './styles.css';

const Nav = ({ index, onChange }) => (
    <div className={styles.nav}>
        <Arrow index={index} onClick={onChange} position="left" />
        <Arrow index={index} onClick={onChange} position="right" />
    </div>
);

export default Nav;

Nav.defaultProps = {
    index: 0,
    onChange: () => {},
};

Nav.propTypes = {
    index: PropTypes.number,
    onChange: PropTypes.func,
};
