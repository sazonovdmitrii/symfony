import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const DialogActions = ({ children }) => <div className={styles.actions}>{children}</div>;

DialogActions.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DialogActions;
