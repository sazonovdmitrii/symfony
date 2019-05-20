import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const SortBox = ({ query, location, rows, match }) => {
    const { search } = location;
    const searchParams = new URLSearchParams(search);
    const searchLimit = parseInt(searchParams.get('rows'), 10);
    const limit = rows.indexOf(searchLimit) >= 0 ? searchLimit : rows[0];

    return (
        <div className={styles.root}>
            <span className={styles.span}>Выводить по </span>
            <span className={styles.rows}>
                {rows.map(item => {
                    const linkClassName = cx(styles.link, { active: item === limit });

                    return (
                        <Link
                            key={item}
                            className={linkClassName}
                            to={`/search/?search=${query}&rows=${item}`}
                            rel="nofollow"
                        >
                            {item}
                        </Link>
                    );
                })}
            </span>
        </div>
    );
};

SortBox.propTypes = {
    query: PropTypes.string.isRequired,
    location: PropTypes.objectOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.number).isRequired,
    match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withRouter(SortBox);
