import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Stripe = ({ className, children, kind }) => {
    const rootClassName = cx(styles.root, className, {
        [kind]: !!kind,
    });

    return <div className={rootClassName}>{children}</div>;
};

Stripe.defaultProps = {
    kind: '',
    className: '',
};

Stripe.propTypes = {
    kind: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    className: PropTypes.string,
};

export default Stripe;
