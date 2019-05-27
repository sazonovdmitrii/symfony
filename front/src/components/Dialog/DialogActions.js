import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const DialogActions = ({ children }) => <div className={styles.actions}>{children}</div>;

DialogActions.defaultProps = {};

DialogActions.propTypes = {};

export default DialogActions;
