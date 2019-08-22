import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useTransition, animated } from 'react-spring';

import styles from './styles.css';
import SuccessIcon from './icons/success.svg';
import InfoIcon from './icons/info.svg';
import WarningIcon from './icons/warning.svg';
import ErrorIcon from './icons/error.svg';
import CloseIcon from './icons/close.svg';

const cx = classNames.bind(styles);

const getIcon = (theme, className) => {
    switch (theme) {
        case 'success':
            return <SuccessIcon className={className} />;
        case 'info':
            return <InfoIcon className={className} />;
        case 'warning':
            return <WarningIcon className={className} />;
        case 'error':
            return <ErrorIcon className={className} />;
        default:
            return '';
    }
};

const Snackbar = ({ text, theme, active, onClose, overlay }) => {
    const className = cx(styles.snackbar, {
        [theme]: theme,
    });
    const overlayClassName = cx(overlay ? 'overlay' : 'item');
    const transitions = useTransition(active, null, {
        from: { transform: 'translateY(200px)', opacity: 0 },
        enter: { transform: 'translateY(0)', opacity: 1 },
        leave: { opacity: 0 },
    });

    const $Snackbar = transitions.map(
        ({ item, key, props }) =>
            item && (
                <div key={key} className={overlayClassName}>
                    <animated.div className={className} style={props} role="alertdialog">
                        <div className={styles.inner}>
                            <span className={styles.row}>
                                {getIcon(theme, styles.icon)}
                                {text}
                            </span>
                        </div>
                        <div className={styles.right}>
                            <button
                                type="button"
                                className={styles.button}
                                aria-label="Закрыть"
                                onClick={onClose}
                            >
                                <span className={styles.close}>
                                    <CloseIcon />
                                </span>
                            </button>
                        </div>
                    </animated.div>
                </div>
            )
    );

    if (!overlay) {
        return $Snackbar;
    }

    const domNode = document.body;
    if (typeof document !== 'undefined' && domNode) {
        return createPortal($Snackbar, domNode);
    }
    return null;
};

Snackbar.defaultProps = {
    active: false,
    theme: '',
    overlay: true,
};

Snackbar.propTypes = {
    onClose: PropTypes.func.isRequired,
    active: PropTypes.bool,
    theme: PropTypes.string,
    text: PropTypes.string.isRequired,
    overlay: PropTypes.bool,
};

export default Snackbar;
