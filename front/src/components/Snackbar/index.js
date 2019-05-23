import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames/bind';

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

class $Snackbar extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        active: PropTypes.bool,
        theme: PropTypes.string,
        message: PropTypes.string.isRequired,
    };

    static defaultProps = {
        active: false,
        theme: '',
    };

    handleClose = () => {
        const { onClose } = this.props;
        if (onClose) {
            onClose();
        }
    };

    render() {
        const { message, theme, active } = this.props;

        if (!message) return null;

        const className = cx(styles.snackbar, {
            [theme]: theme,
        });
        const Snackbar = (
            <CSSTransition
                in={active}
                classNames={{ enterDone: styles.overlayEnterDone }}
                timeout={300}
                unmountOnExit
            >
                {() => (
                    <div className={styles.overlay}>
                        <div className={className} role="alertdialog">
                            <div className={styles.inner}>
                                <div className={styles.row}>
                                    {getIcon(theme, styles.icon)}
                                    <div>{message}</div>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <button
                                    type="button"
                                    className={styles.button}
                                    aria-label="Закрыть"
                                    onClick={this.handleClose}
                                >
                                    <span className={styles.close}>
                                        <CloseIcon />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </CSSTransition>
        );

        // TODO fix ssr
        const domNode = document.body;

        if (domNode) {
            return createPortal(Snackbar, domNode);
        }
        return Snackbar;
    }
}

export default $Snackbar;
