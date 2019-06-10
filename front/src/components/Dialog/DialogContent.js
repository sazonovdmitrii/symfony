import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const DialogContent = ({ children }) => <div className={styles.content}>{children}</div>;

DialogContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DialogContent;
