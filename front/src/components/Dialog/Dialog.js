import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { useOnClickOutside } from 'hooks';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Dialog = ({ children, open, onClose, fullWidth, maxWidth }) => {
    const overlayNode = useRef(null);
    const rootClassName = cx(styles.root, {
        open,
    });
    const innerClassName = cx(styles.inner, {
        fullWidth,
        [maxWidth]: !!maxWidth,
    });
    useOnClickOutside(overlayNode, () => onClose());

    if (!open) return null;

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

    const domNode = document.body;

    if (domNode) return createPortal($Dialog, domNode);

    return null;
};

Dialog.defaultProps = {};

Dialog.propTypes = {};

export default Dialog;
