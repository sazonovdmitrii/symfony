import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { useInterval } from 'hooks';

import Nav from './Nav';
import styles from './styles.css';

const cx = classnames.bind(styles);

const Banners = ({ children, interval, autoPlay: autoPlayProp }) => {
    const [active, setActive] = useState(0);
    const [autoPlay, setAutoplay] = useState(autoPlayProp);
    const getActive = index => {
        const lastIndex = children.length - 1;

        /* eslint-disable-next-line */
        return index > lastIndex ? 0 : index < 0 ? lastIndex : index;
    };

    useInterval(
        () => {
            setActive(getActive(active + 1));
        },
        autoPlay ? interval : null
    );

    const handleChange = index => {
        setActive(getActive(index));
    };

    const handleHover = event => {
        const eventType = event.type;

        const events = {
            mouseenter: false,
            mouseleave: true,
        };

        setAutoplay(events[eventType]);
    };

    const getChildrens = React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const activeBannerClassName = cx(styles.item, {
            active: active === index,
        });

        return (
            <div
                key={index} // eslint-disable-line
                className={activeBannerClassName}
            >
                {child}
            </div>
        );
    });

    return (
        <div className={styles.wrapper} onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <div className={styles.items}>{getChildrens}</div>
            <Nav index={active} onChange={handleChange} />
        </div>
    );
};

Banners.defaultProps = {
    children: [],
    interval: 10000,
    autoPlay: true,
};
Banners.propTypes = {
    children: PropTypes.node,
    interval: PropTypes.number,
    autoPlay: PropTypes.bool,
};

export default Banners;
