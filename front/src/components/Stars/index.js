import React from 'react';
import PropTypes from 'prop-types';

import RadioGroup from 'components/RadioGroup';

import Star from './Star.js';
import styles from './styles.css';

const Stars = ({ name, value, onChange }) => (
    <RadioGroup className={styles.root} name={name} value={value} onChange={onChange}>
        <Star value="0" hidden disabled />
        <Star value="1" label="плохо" />
        <Star value="2" label="так себе" />
        <Star value="3" label="нормально" />
        <Star value="4" label="хорошо" />
        <Star value="5" label="отлично" />
    </RadioGroup>
);

Stars.defaultProps = {
    name: 'star',
};

Stars.propTypes = {};

export default Stars;
