import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import styles from './styles.css';

class Breadcrumbs extends Component {
    handleDeleteFilter = () => {
        const { location, history } = this.props;
        const { pathname } = location;
        const url = pathname.replace(/\/\w+$/, '');

        history.push(url);
    };

    render() {
        const { items = [] } = this.props;

        return (
            <ul className={styles.wrapper} itemType="http://schema.org/BreadcrumbList" itemScope>
                {items.map((item, index) => (
                    <li
                        key={item.url || Math.random()}
                        className={styles.item}
                        itemType="http://schema.org/ListItem"
                        itemProp="itemListElement"
                        itemScope
                    >
                        <meta itemProp="position" content={index} />
                        <Link to={item.url || '/'} className={styles.link} itemProp="item">
                            {item.name}
                        </Link>
                        {!item.filter && (
                            <button
                                type="button"
                                className={styles.delete}
                                onClick={this.handleDeleteFilter}
                                title="Очистить фильтр"
                            />
                        )}
                    </li>
                ))}
            </ul>
        );
    }
}

export default withRouter(Breadcrumbs);
