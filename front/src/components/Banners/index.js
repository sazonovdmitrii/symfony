import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { useInterval } from 'hooks';

import Nav from './Nav';
import styles from './styles.css';

const cx = classnames.bind(styles);

const Banners = ({ children, interval, autoPlay: autoPlayProp }) => {
    const [state, dispatch] = useReducer(
        (state, action) => {
            const childLength = children.length;

            switch (action.type) {
                case 'NEXT':
                    return {
                        ...state,
                        active: (state.active + 1) % childLength,
                    };
                case 'PREV':
                    return {
                        ...state,
                        active: (state.active - 1 + childLength) % childLength,
                    };
                case 'PAUSE':
                    return {
                        ...state,
                        isPlaying: false,
                    };
                case 'PLAY':
                    return {
                        ...state,
                        isPlaying: true,
                    };
                default:
                    return state;
            }
        },
        {
            active: 0,
            isPlaying: autoPlayProp,
        }
    );
    useInterval(
        () => {
            dispatch({ type: 'NEXT' });
        },
        state.isPlaying ? interval : null
    );
    const handleChange = index => {
        dispatch({ type: index > state.active ? 'NEXT' : 'PREV' });
    };
    const handleHover = ({ type }) => {
        const events = {
            mouseenter: 'PAUSE',
            mouseleave: 'PLAY',
        };

        dispatch({ type: events[type] });
    };
    const getChildrens = React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
            return null;
        }

        const activeBannerClassName = cx(styles.item, {
            active: state.active === index,
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
            <Nav index={state.active} onChange={handleChange} />
        </div>
    );
};

Banners.defaultProps = {
    children: [],
    interval: 10000,
    autoPlay: false,
};
Banners.propTypes = {
    children: PropTypes.node,
    interval: PropTypes.number,
    autoPlay: PropTypes.bool,
};

export default Banners;
