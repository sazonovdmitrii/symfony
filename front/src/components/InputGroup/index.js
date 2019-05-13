import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const InputGroup = ({ column = '', children }) => {
    const columnClassName = cx(styles.col, {
        [`col${column}`]: column,
    });
    if (Array.isArray(children)) {
        return (
            <div className={styles.row}>
                {React.Children.map(children, item => (
                    <div className={columnClassName}>
                        <div className={styles.field}>{item}</div>
                    </div>
                ))}
            </div>
        );
    }

    return <div className={styles.field}>{children}</div>;
};

InputGroup.defaultProps = {
    column: null,
};

InputGroup.propTypes = {
    column: PropTypes.number,
    children: PropTypes.node.isRequired,
};

export default InputGroup;
