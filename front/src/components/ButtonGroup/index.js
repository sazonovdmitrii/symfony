import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const ButtonGroup = ({ children: childrenProp }) => {
    const children = React.Children.map(childrenProp, (child, index) => {
        if (!React.isValidElement(child)) {
            return null;
        }

        return (
            <div
                key={index} // eslint-disable-line
                className={styles.item}
            >
                {child}
            </div>
        );
    });

    return <div className={styles.row}>{children}</div>;
};

ButtonGroup.defaultProps = {};

ButtonGroup.propTypes = {};

export default ButtonGroup;
