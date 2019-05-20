import React from 'react';

import styles from './styles.css';

const ErrorMessage = ({ error }) => (
    <div className={styles.errorMessage}>
        <small>{error.toString()}</small>
    </div>
);

export default ErrorMessage;
