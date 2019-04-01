import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.css';

export default ({ id }) => (
    <div className={styles.wrapper}>
        <div className={styles.text}>
            <br /> г. 13, индекс: 123, ул. 123, д. 123, корп. 123, кв. 123, тел. +7 (123) 1231321
        </div>
        <div className="pull-right">
            <Link className="flaticon-pencil41" to={`/user/addressbook/edit/${id}`} />
            <Link className="flaticon-delete96" to={`/user/addressbook/delete/${id}`} />
        </div>
    </div>
);
