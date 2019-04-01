import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames/bind';

import style from './style.css';
import SuccessIcon from './success.svg';
import InfoIcon from './info.svg';
import WarningIcon from './warning.svg';
import ErrorIcon from './error.svg';
import CloseIcon from './close.svg';

const cx = classNames.bind(style);

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

class $Snackbar extends PureComponent {
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

        const className = cx(style.snackbar, {
            [theme]: theme,
        });
        const Snackbar = (
            <CSSTransition
                in={active}
                classNames={{ enterDone: style.overlayEnterDone }}
                timeout={300}
                unmountOnExit
            >
                {() => (
                    <div className={style.overlay}>
                        <div className={className} role="alertdialog">
                            <div className={style.inner}>
                                <span className={style.row}>
                                    {getIcon(theme, style.icon)}
                                    {message}
                                </span>
                            </div>
                            <div className={style.right}>
                                <button
                                    type="button"
                                    className={style.button}
                                    aria-label="Закрыть"
                                    onClick={this.handleClose}
                                >
                                    <span className={style.close}>
                                        <CloseIcon />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </CSSTransition>
        );
        const domNode = document.body;

        if (domNode) {
            return ReactDOM.createPortal(Snackbar, domNode);
        }
        return null;
    }
}

export default $Snackbar;
