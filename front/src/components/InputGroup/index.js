import React from 'react';

import styles from './styles.css';

export default ({ column = '', children = [] }) => {
    if (Array.isArray(children)) {
        return (
            <div className={styles.row}>
                {React.Children.map(children, item => (
                    <div className={styles.col + column}>
                        <div className={styles.field}>{item}</div>
                    </div>
                ))}
            </div>
        );
    }

    return <div className={styles.field}>{children}</div>;
};
