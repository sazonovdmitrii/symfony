import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

const RichText = ({ maxHeight, children, expanded }) => {
    const [show, setState] = useState(expanded);
    const containerNode = React.createRef();

    useEffect(() => {
        const { offsetHeight } = containerNode.current;

        if (offsetHeight && maxHeight > offsetHeight) setState(true);
    }, [containerNode, maxHeight]);

    const transitions = useTransition(show, null, {
        from: { opacity: 1 },
        enter: { opacity: 0 },
        leave: { opacity: 1 },
    });

    const expandedClassName = cx({
        expanded: show,
    });

    return (
        <div>
            <div
                ref={containerNode}
                className="nfe_rte"
                itemProp="description"
                style={{ position: 'relative' }}
            >
                <div
                    className={expandedClassName}
                    style={{ maxHeight: `${maxHeight}px`, overflow: 'hidden' }}
                >
                    {children}
                </div>
                {transitions.map(
                    ({ item, key, props }) =>
                        item && <animated.div className={styles.overflow} style={props} />
                )}
                {!show && <div className={styles.overflow} />}
            </div>
            {!show && (
                <button className={styles.button} onClick={() => setState(!show)}>
                    Подробнее...
                </button>
            )}
        </div>
    );
};

RichText.propTypes = {
    maxHeight: PropTypes.number,
};

RichText.defaultProps = {
    expanded: false,
    maxHeight: 100,
};

export default RichText;
