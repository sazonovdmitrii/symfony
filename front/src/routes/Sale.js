import React, { Component, Fragment } from 'react';

export default class Sale extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div class="sale-info">
                    <img class="sale-info__image" src="/sale/1533/sale_1533_0.jpg" />
                    <div class="sale-info__body rte">
                        <h1 class="sale-info__title">Парфюмерия Nina Ricci со скидкой 11%</h1>
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
                        <p class="sale-info__date"> Акция действует с 14 марта по 13 апреля</p>
                        <form class="subscribe" role="subscribe-form" data-behavior="subscribe">
                            <div class="subscribe__form subscribe-form">
                                <label class="salesub__label">
                                    <span class="salesub__label-txt--labelname">E-mail:</span>
                                    <input
                                        type="email"
                                        name="email"
                                        class="salesub__input input-text"
                                        placeholder="Email"
                                        pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                                        title="Пример: info@laparfumerie.ru"
                                        required=""
                                    />
                                </label>
                                <button class="button button_role_login button-red">Подписаться</button>
                                <input type="hidden" name="type" value="2" />
                                <div class="subscribe__notification" data-render="notification" />
                            </div>
                        </form>
                        <p class="sale-info__date">
                            Чтобы первым получать новые скидки, подпишитесь на рассылку акций!
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}
