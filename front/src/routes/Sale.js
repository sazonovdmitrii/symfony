import React, { Component } from 'react';

import { seoHead } from 'utils';

import Input from 'components/Input';
import Products from 'components/Products';

export default class Sale extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.match.params);
    }

    render() {
        const { location } = this.props;

        return (
            <>
                {seoHead('sale', { name: 'Lorem', url: location.pathname })}
                <div className="sale-info">
                    <img className="sale-info__image" src="https://placehold.it/503x290" alt="" />
                    <div className="sale-info__body rte">
                        <h1 className="sale-info__title">Парфюмерия Nina Ricci со скидкой 11%</h1>
                        <p>
                            <span>
                                Духи Nina Ricci — это интересная история о любви, женственности, романтических
                                отношениях и бесконечной нежности. История, которую рассказывает волшебный
                                аромат роз, фиалок и орхидей, цветов миндаля и фруктов. Ошибиться в выборе
                                таких духов просто невозможно, потому что они безупречны в своем исполнении.
                                Серии ароматов L’Extase, L'Air du Temps, Nina, Luna способны удовлетворить
                                самый взыскательный женский вкус. Духи Nina Ricci могут звучать строго,
                                по-деловому, нежно и обольстительно, загадочно, но всегда женственно и
                                притягательно. Предлагаем купить парфюмерию модного бренда Nina Ricci со
                                скидкой 11%.
                            </span>
                        </p>
                        <p className="sale-info__date"> Акция действует с 14 марта по 13 апреля</p>
                        <form className="subscribe" role="subscribe-form" data-behavior="subscribe">
                            <div className="subscribe__form subscribe-form">
                                <Input
                                    type="email"
                                    name="email"
                                    label="Email"
                                    className="salesub__input input-text"
                                    placeholder="Email"
                                    pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                                    title="Пример: info@laparfumerie.ru"
                                    required
                                />
                                <button className="button button_role_login button-red">Подписаться</button>
                                <input type="hidden" name="type" value="2" />
                                <div className="subscribe__notification" data-render="notification" />
                            </div>
                        </form>
                        <p className="sale-info__date">
                            Чтобы первым получать новые скидки, подпишитесь на рассылку акций!
                        </p>
                    </div>
                </div>
                <Products />
            </>
        );
    }
}
