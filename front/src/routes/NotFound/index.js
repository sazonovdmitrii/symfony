import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter, StaticRouter } from 'react-router-dom';

import { RouteStatus } from 'utils';

import Button from 'components/Button';

import styles from './styles.css';
import image from './images/page-not-found-image.jpg';

class NotFound extends Component {
    staticContext = {};

    render() {
        return (
            <RouteStatus statusCode={404}>
                <div className={styles.row}>
                    <Helmet>
                        <meta name="robots" content="noindex" />
                    </Helmet>
                    <div className={`${styles.col} ${styles.hideOnMobile}`}>
                        <img src={image} style={{ marginTop: '15px' }} alt="" />
                    </div>
                    <div className={styles.col}>
                        <div className="rte">
                            <h1 style={{ fontSize: '120px', margin: '30px 0' }}>404</h1>
                            <p className="page__text">Запрашиваемая вами страница не найдена</p>
                            <p>
                                Данная страница не найдена!
                                <br />
                                Почему?{' '}
                                <span>Возможно, Вы неправильно ввели адрес в адресной строке браузера.</span>
                                <br />
                                Что можно сделать?
                                <span>
                                    Вы можете посетить другие разделы ресурса, воспользовавшись основным меню
                                    сайта.
                                </span>
                            </p>
                            <Button to="/" kind="primary">
                                Перейти на главную страницу сайта
                            </Button>
                        </div>
                    </div>
                </div>
            </RouteStatus>
        );
    }
}

export default NotFound;
