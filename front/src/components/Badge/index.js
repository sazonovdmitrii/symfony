import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Badge = ({ className, children, badgeContent, kind, dot, invisible, style }) => {
    const rootClassName = cx(styles.root, className);
    const badgeClassName = cx(styles.badge, {
        dot,
        invisible: !!invisible,
        [kind]: !!kind,
    });

    return (
        <span className={rootClassName} style={style.root}>
            {children}
            <span className={badgeClassName} style={style.badge}>
                {badgeContent}
            </span>
        </span>
    );
};

Badge.defaultProps = {
    className: null,
    kind: '',
    dot: false,
    invisible: false,
    style: {},
};

Badge.propTypes = {
    style: PropTypes.objectOf(PropTypes.string),
    kind: PropTypes.string,
    dot: PropTypes.bool,
    invisible: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Badge;
