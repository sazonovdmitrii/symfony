import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import styles from './styles.css';
import removeIcon from './images/remove.png';

class Breadcrumbs extends Component {
    handleDeleteFilter = () => {
        const { pathname } = this.props.location;
        const url = pathname.replace(/\/\w+$/, '');

        this.props.history.push(url);
    };
    render() {
        const { items = [] } = this.props;
        return (
            <ul className={styles.wrapper}>
                {items.map((item, index) => (
                    <li key={item.url || Math.random()} className={styles.item}>
                        <Link to={item.url || '/'} className={styles.link}>
                            {item.name}
                        </Link>
                        {!item.filter && (
                            <button
                                type="button"
                                className={styles.delete}
                                onClick={this.handleDeleteFilter}
                            />
                        )}
                    </li>
                ))}
            </ul>
        );
    }
}

export default withRouter(Breadcrumbs);
