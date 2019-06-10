import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { useOnClickOutside } from 'hooks';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Dialog = ({ children, open, onClose, fullWidth, maxWidth }) => {
    const rootClassName = cx(styles.root);
    const innerClassName = cx(styles.inner, {
        fullWidth,
        [maxWidth]: !!maxWidth,
    });
    const overlayNode = useRef(null);
    const domNode = document.body;
    useEffect(() => {
        if (open) {
            if (window.innerWidth !== overlayNode.current.clientWidth) domNode.style.paddingRight = '15px';
            domNode.style.overflow = 'hidden';
        }

        return () => {
            domNode.style = null;
        };
    }, [domNode.style, open]);

    useOnClickOutside(overlayNode, () => {
        onClose();
    });

    const $Dialog = (
        <div role="dialog" className={rootClassName}>
            <div className={styles.overlay} />
            <div className={styles.container}>
                <div ref={overlayNode} className={innerClassName}>
                    {children}
                </div>
            </div>
        </div>
    );

    if (typeof document !== 'undefined' && domNode) return createPortal($Dialog, domNode);

    return null;
};

Dialog.defaultProps = {
    open: false,
    onClose: () => {},
    fullWidth: false,
    maxWidth: null,
};

Dialog.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
};

export default Dialog;
