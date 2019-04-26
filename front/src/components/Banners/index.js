import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Nav from './Nav';
import styles from './styles.css';

const cx = classnames.bind(styles);

export default class Banners extends Component {
    static defaultProps = {
        children: [],
        interval: 10000,
    };

    constructor(props) {
        super(props);

        this.state = {
            activeBannerIndex: 0,
        };

        this.initAutoplay();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    initAutoplay = () => {
        const { interval } = this.props;
        const { activeBannerIndex } = this.state;

        this.timer = setInterval(() => {
            this.handleChange(activeBannerIndex + 1);
        }, interval);
    };

    handleChange = activeBannerIndex => {
        const { children } = this.props;
        const lastIndex = children.length - 1;

        this.setState({
            activeBannerIndex:
                activeBannerIndex > lastIndex ? 0 : activeBannerIndex < 0 ? lastIndex : activeBannerIndex,
        });
    };

    handleHover = () => {
        clearTimeout(this.timer);
    };

    render() {
        const { children } = this.props;
        const { activeBannerIndex } = this.state;
        const getChildrens = React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) {
                return null;
            }

            const activeBannerClassName = cx(styles.item, {
                active: activeBannerIndex === index,
            });

            return (
                <li key={index} className={activeBannerClassName}>
                    {child}
                </li>
            );
        });

        return (
            <div className={styles.wrapper} onMouseEnter={this.handleHover} onMouseLeave={this.initAutoplay}>
                <ul className={styles.items}>{getChildrens}</ul>
                <Nav index={activeBannerIndex} onChange={this.handleChange} />
            </div>
        );
    }
}

Banners.propTypes = {
    children: PropTypes.node,
    interval: PropTypes.number,
};
