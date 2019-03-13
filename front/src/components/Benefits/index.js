import React, { Component } from 'react';

import delivery_1x from './images/delivery_1x.jpg';
import delivery_2x from './images/delivery_2x.jpg';
import gifts_1x from './images/gifts_1x.jpg';
import gifts_2x from './images/gifts_2x.jpg';
import parfumeriya_1x from './images/parfumeriya_1x.jpg';
import parfumeriya_2x from './images/parfumeriya_2x.jpg';
import sale_1x from './images/sale_1x.jpg';
import sale_2x from './images/sale_2x.jpg';

export default () => (
    <div className="benefits">
        <a href="/sales/" className="benefits__item">
            <picture>
                <source srcSet={`${sale_1x} 1x, ${sale_2x} 2x`} />
                <img className="benefits__img" src={sale_1x} alt="Новые акции" />
            </picture>
        </a>
        <a href="/info/return.htm" className="benefits__item">
            <picture>
                <source srcSet={`${parfumeriya_1x} 1x, ${parfumeriya_2x} 2x`} />
                <img className="benefits__img" src={parfumeriya_1x} alt="Бесплатный возврат" />
            </picture>
        </a>
        <a href="/info/delivery-and-payment.htm" className="benefits__item">
            <picture>
                <source srcSet={`${delivery_1x} 1x, ${delivery_2x} 2x`} />
                <img className="benefits__img" src={delivery_1x} alt="Всегда бесплатная доставка!" />
            </picture>
        </a>
        <a href="/podarki-k-zakazam/" className="benefits__item">
            <picture>
                <source srcSet={`${gifts_1x} 1x, ${gifts_2x} 2x`} />
                <img className="benefits__img" src={gifts_1x} alt="Скидки до 50%" />
            </picture>
        </a>
    </div>
);
