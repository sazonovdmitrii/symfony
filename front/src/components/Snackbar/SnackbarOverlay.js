import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const SnackbarOverlay = ({ children }) => {
    const domNode = document.body;

    if (typeof document !== 'undefined' && domNode) {
        return createPortal(<div className={styles.overlay}>{children}</div>, domNode);
    }
    return null;
};

export default SnackbarOverlay;
