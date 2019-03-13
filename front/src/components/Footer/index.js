import React, { Component } from 'react';

import FooterTopBrands from 'components/FooterTopBrands';
import FooterMenu from 'components/FooterMenu';
import Share from 'components/Share';
import Subscribe from 'components/Subscribe';

import styles from './styles.css';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export default () => {
    const currentYear = new Date().getFullYear();
    const sectionThinClassName = cx(styles.section, styles.thin);

    return (
        <footer className="footer">
            <div className="footer__row">
                <FooterTopBrands />
            </div>
            <div className="footer__row">
                <FooterMenu />
            </div>
            <div className="footer__row--thin">
                <div className="footer__half">
                    <Subscribe />
                </div>
                <div className="footer__half">
                    <Share />
                </div>
            </div>
            <div className="footer__row">
                <small>
                    @La Parfumerie
                    <span itemProp="copyrightYear" content="2008">
                        2008-2019
                    </span>
                    <span
                        itemProp="author copyrightHolder"
                        itemScope
                        itemType="http://schema.org/LocalBusiness"
                    >
                        <span itemProp="name brand" content="La Parfumerie" />,
                        <span itemProp="legalName">ООО «НИКА»</span>
                        <span itemProp="logo" content="http://laparfumerie.ru/fe/images/logo.jpg" />
                        <span itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                            <span itemProp="postalCode">127055</span>, г.
                            <span itemProp="addressLocality">Москва</span>,
                            <span itemProp="streetAddress">Угловой пер., д.2, помещение VII</span>
                        </span>
                        <span itemProp="email">info@laparfumerie.ru</span>
                        <span itemProp="telephone">+7 (495) 539 53 15</span>
                    </span>
                </small>
                <div className="footer__row-pay">
                    <b className="footer__row-pay-label">Мы принимаем:</b>
                    <div className="footer__payment">
                        <i className="footer__payment-img sprite--visa">Visa</i>
                        <i className="footer__payment-img sprite--mastercard">Mastercard</i>
                        <i className="footer__payment-img sprite--maestro">Maestro</i>
                        <i className="footer__payment-img sprite--mir">Мир</i>
                        <i className="footer__payment-img sprite--alfa">Альфа Банк</i>
                        <i className="footer__payment-img sprite--cash">Наличные</i>
                    </div>
                </div>
            </div>
        </footer>
    );
};
