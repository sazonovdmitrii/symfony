import React from 'react';
import PropTypes from 'prop-types';

import globalMeta from 'globalMeta';

import RichText from 'components/RichText';
import Button from 'components/Button';

import styles from './styles.css';

const Success = ({ id }) => (
    <div className={styles.root}>
        <div className={styles.box}>
            <h1 className={styles.title}>Спасибо за сделанный заказ!</h1>
            <h2 className={styles.subtitle}>
                Ваш заказ <span className={styles.primaryColor}>№ {id}</span>
            </h2>
            <RichText expanded={true}>
                <p>В ближайшее время с вами свяжется оператор для уточнения деталей доставки </p>
                <p>
                    По всем возникающим вопросам, пожалуйста, обращайтесь в нашу Службу по работе с клиентами.
                    Связаться с нами можно следующими способами:
                </p>
                <ol>
                    <li>
                        по телефону в Москве:
                        <a href="tel:+74955395315">{globalMeta.phone.moscow}</a>
                    </li>
                    <li className="info__helper-list-item">
                        написать нам письмо по электронной почте:
                        <address>
                            <a
                                className={styles.primaryColor}
                                href={`mailto:${globalMeta.email}`}
                                title="Написать на email"
                            >
                                {globalMeta.email}
                            </a>
                        </address>
                    </li>
                </ol>
                <Button to="/" kind="primary">
                    Продолжить покупки
                </Button>
            </RichText>
        </div>
    </div>
);

Success.defaultProps = {};

Success.propTypes = {};

export default Success;
