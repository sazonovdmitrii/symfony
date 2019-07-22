import React from 'react';
import PropTypes from 'prop-types';

import GiftItem from 'components/GiftItem';

const Gifts = ({ items }) => {
    if (!items.length) return null;

    return (
        <div>
            {items.map(item => (
                <GiftItem {...item} />
            ))}
        </div>
    );
};

Gifts.defaultProps = {};

Gifts.propTypes = {};

export default Gifts;
