import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';
import image from './images/page-not-found-image.jpg';

const NotFound = props => (
    <div className={styles.row}>
        <div className={`${styles.col} ${styles.hideOnMobile}`}>
            <img src={image} style={{ marginTop: '15px' }} />
        </div>
        <div className={styles.col}>
            <h1 style={{ fontSize: '120px', margin: '30px 0' }}>404</h1>
            <p className="page__text">Запрашиваемая вами страница не найдена</p>
            <p>Данная страница не найдена!</p>
            <p>
                Почему? <span>Возможно, Вы неправильно ввели адрес в адресной строке браузера.</span>
            </p>
            <p>
                Что можно сделать?
                <span>Вы можете посетить другие разделы ресурса, воспользовавшись основным меню сайта.</span>
            </p>
            <p>
                <span>
                    Перейти на <a href="/">главную страницу сайта.</a>
                </span>
            </p>
        </div>
    </div>
);

export default NotFound;
