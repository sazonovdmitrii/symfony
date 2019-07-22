import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Button from 'components/Button';

import styles from './styles.css';

const cx = classnames.bind(styles);

const StepContainer = ({
    stepTitle = '',
    nav = {},
    finalNav = { header: true, footer: false, ...nav },
    title = '',
    description = '',
    children,
    theme = {},
    active,
    maxSteps = 0,
    onChange = () => {},
}) => {
    const rootClassName = cx(styles.root, theme.root);
    const headerClassName = cx(styles.header, theme.header);
    const titleClassName = cx(styles.stepTitle, theme.stepTitle);
    const stepTitleClassName = cx(styles.title, theme.title);
    const descriptionClassName = cx(styles.description, theme.description);
    const navClassName = cx(styles.nav, theme.nav);
    const bodyClassName = cx(styles.body, theme.body);

    const navBlock = (
        <div className={navClassName}>
            {active > 0 ? (
                <Button className="basket__button" onClick={() => onChange(active - 1)} kind="secondary" bold>
                    Назад
                </Button>
            ) : (
                <Button className="basket__button" to="/" kind="secondary" bold>
                    Продолжить покупки
                </Button>
            )}
            {(active === 0 || active !== maxSteps) && (
                <Button className="basket__button" onClick={() => onChange(active + 1)} kind="primary" bold>
                    Далее
                </Button>
            )}
        </div>
    );

    return (
        <div className={rootClassName}>
            <div className={headerClassName}>
                {stepTitle && <div className={titleClassName}>{stepTitle}</div>}
                {title && <div className={stepTitleClassName}>{title}</div>}
                {description && <div className={descriptionClassName}>{description}</div>}
                {finalNav.header && navBlock}
            </div>
            <div className={bodyClassName}>{children}</div>
            {finalNav.footer && <div className={headerClassName}>{navBlock}</div>}
        </div>
    );
};

StepContainer.propTypes = {
    children: PropTypes.node.isRequired,
    stepTitle: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    nav: PropTypes.objectOf(PropTypes.bool),
    maxSteps: PropTypes.number,
};

export default StepContainer;
