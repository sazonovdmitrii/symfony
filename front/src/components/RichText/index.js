import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const RichText = ({ maxHeight, children, expanded }) => {
    const [show, setState] = useState(expanded);
    const containerNode = useRef(null);

    useEffect(() => {
        const { offsetHeight } = containerNode.current;

        if (offsetHeight && maxHeight > offsetHeight) setState(true);
    }, [maxHeight]);

    return (
        <div>
            <div ref={containerNode} className="rte" itemProp="description" style={{ position: 'relative' }}>
                <div style={show ? null : { maxHeight: `${maxHeight}px`, overflow: 'hidden' }}>
                    {children}
                </div>
                {!show && <div className={styles.overflow} />}
            </div>
            {!show && (
                <button type="button" className={styles.button} onClick={() => setState(!show)}>
                    Подробнее...
                </button>
            )}
        </div>
    );
};

RichText.propTypes = {
    maxHeight: PropTypes.number,
    expanded: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

RichText.defaultProps = {
    expanded: false,
    maxHeight: 100,
};

export default RichText;
