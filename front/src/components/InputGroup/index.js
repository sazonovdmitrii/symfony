import React, { Component } from 'react';

import styles from './styles.css';

export default class InputGroup extends Component {
    static defaultProps = {
        column: '',
        children: [],
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { children, column } = this.props;

        if (Array.isArray(children)) {
            return (
                <div className={styles.row}>
                    {React.Children.map(children, item => (
                        <div className={styles.col + column}>
                            <div className={styles.field}>{item}</div>
                        </div>
                    ))}
                </div>
            );
        }

        return <div className={styles.field}>{children}</div>;
    }
}
