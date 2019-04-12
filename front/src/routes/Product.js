import React, { Component, Fragment } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import NotFound from 'routes/NotFound';

import Button from 'components/Button';
import Tabs from 'components/Tabs';
import Tab from 'components/Tabs/Tab';
import TabsView from 'components/Tabs/TabsView';
import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import CommentForm from 'components/CommentForm';
import Comment from 'components/Comment';
import RichText from 'components/RichText';

const GET_PRODUCT = gql`
    query Product($slug: String!) {
        product(slug: $slug) {
            name
        }
    }
`;

export default class Product extends Component {
    static defaultProps = {
        items: [
            {
                name: 'Туалетные духи 30 мл',
                available: 1,
                prices: {
                    final_price: {
                        value: 6429,
                        currency: 'Руб.',
                    },
                    sale_price: {
                        value: 5658,
                        currency: 'Руб.',
                    },
                },
                id: 5261,
            },
            {
                name: 'Туалетные духи 50 мл',
                available: 0,
                prices: {
                    final_price: {
                        value: 8327,
                        currency: 'Руб.',
                    },
                    sale_price: {
                        value: 7328,
                        currency: 'Руб.',
                    },
                },
                id: 5262,
            },
            {
                name: 'Туалетные духи 50 мл',
                available: 1,
                prices: {
                    final_price: {
                        value: 8327,
                        currency: 'Руб.',
                    },
                    sale_price: {
                        value: 7328,
                        currency: 'Руб.',
                    },
                },
                id: 5262,
            },
        ],
        name: 'Туалетные духи Chloe Love',
        brand_name: 'Chloe Love',
        images: ['https://laparfumerie.ru/product/2016/07/18/4271_80597_658713_ru.jpg'],
        comments: [
            {
                id: 1,
                message:
                    'Мне очень нравится запах этой туалетной воды. Пользуюсь и зимой, и летом. Запах не надоедает и не раздражает. Очень приятный и легкий аромат',
                author: 'Ира М',
                date: '27 мая 2013, 16:57',
                reply: {
                    author: 'Команда Laparf!',
                    message: 'Ира, благодарим, что поделились своим мнением о In Red',
                },
            },
        ],
        likes: 20,
        name_translit: 'эщкере',
        vendor_code: '562292522',
    };
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0,
            selectedProduct: this.props.items[0],
        };
    }
    handleChangeItem = value => {
        const { items } = this.props;
        const selectedProduct = items.find(item => item.id === value);

        this.setState({
            selectedProduct,
        });
    };
    handleChangeTab = ({ value }) => {
        this.setState({
            tabIndex: value,
        });
    };
    handleAddToCard = () => {
        const { selectedProduct } = this.state;

        //todo add to card
    };
    render() {
        const {
            items,
            name,
            images,
            brand_name,
            comments,
            likes,
            name_translit,
            vendor_code,
            location,
        } = this.props;
        const { tabIndex, selectedProduct } = this.state;
        const slug = location.pathname.replace(/^\//, '').replace(/\/$/, '');

        console.log(this.props);

        return (
            <Query query={GET_PRODUCT} variables={{ slug }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return <NotFound />;

                    const { product } = data;
                    const { name } = product;

                    return (
                        <div className="product">
                            <p className="admin-edit">
                                <a
                                    className="admin-edit__link"
                                    href="http://mng.laparfumerie.ru/product/edit/2933"
                                >
                                    администрировать
                                </a>
                            </p>
                            <div className="product__row">
                                <div className="product__brand">
                                    <img
                                        src="/catalog/2013/08/23/26289_237976.jpg.small.jpg"
                                        data-handle="pseudolinks"
                                        data-path="/duhi-agent-provocateur/"
                                        className="product__brand-img"
                                        alt="Agent Provocateur"
                                    />
                                    <span
                                        className="product__brand-name"
                                        data-handle="pseudolinks"
                                        data-path="/duhi-agent-provocateur/"
                                    >
                                        {brand_name}
                                    </span>
                                    <h1 className="product__brand-title">{name}</h1>
                                    <p className="product__brand-subtitle">{name_translit}</p>
                                    <div className="product__brand-stat">
                                        <div className="product__brand-stat-star">
                                            <i className="product-element__star--active" />
                                            <i className="product-element__star--active" />
                                            <i className="product-element__star--active" />
                                            <i className="product-element__star--active" />
                                        </div>
                                        <span className="product__brand-stat-review">
                                            <a href="#review">
                                                <i>{comments.length}</i> отзыва
                                            </a>
                                        </span>
                                        <div className="product__brand-stat-like">
                                            <i className="product__brand-stat-like-img" />
                                            <span className="product__brand-stat-like-num">
                                                <i>{likes}</i> нравится
                                            </span>
                                        </div>
                                    </div>
                                    <div className="product__brand-info">
                                        <Tabs value={tabIndex} onChange={this.handleChangeTab}>
                                            <Tab className="product__brand-info-li" selected>
                                                Доставка
                                            </Tab>
                                            <Tab className="product__brand-info-li">
                                                Подарки к заказу
                                                <span className="gifts-json__count" data-render="gifts_count">
                                                    2
                                                </span>
                                            </Tab>
                                            <Tab className="product__brand-info-li">Оплата</Tab>
                                        </Tabs>
                                        <TabsView index={tabIndex}>
                                            <div className="product__brand-info-shipp product__brand-info-block">
                                                tab1
                                            </div>
                                            <div className="product__brand-info-shipp product__brand-info-block">
                                                tab2
                                            </div>
                                            <div className="product__brand-info-shipp product__brand-info-block">
                                                tab3
                                            </div>
                                        </TabsView>
                                    </div>
                                </div>
                                <div className="product__image">
                                    {images.map(item => (
                                        <img key={item} src={item} alt="" />
                                    ))}
                                </div>
                                <div className="product__cart">
                                    <div className="product__cart-block">
                                        <div className="product__cart-block-name">
                                            <h2 className="product__cart-block-name-h2">
                                                {selectedProduct.name}
                                            </h2>
                                            <p className="product__cart-block-name-art">
                                                Артикул{' '}
                                                <span className="product__cart-block-name-art-id">
                                                    {vendor_code}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="product__cart-block-price active">
                                            <strong className="product__cart-block-price-new">
                                                {selectedProduct.prices.sale_price
                                                    ? selectedProduct.prices.sale_price.value
                                                    : selectedProduct.prices.final_price.value}
                                                <span className="product__cart-block-price-currer">
                                                    руб.
                                                    <span />
                                                </span>
                                            </strong>
                                        </div>
                                        <div className="product__cart-block-button">
                                            <div className="product__cart-block-button-form product-item__frm">
                                                <div className="left-3" style={{ width: '60px' }}>
                                                    <select
                                                        name="amount"
                                                        id="amount"
                                                        data-price=""
                                                        data-card="2922.00"
                                                        className="select-group"
                                                    >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                                                    <input type="hidden" data-name="name" value="" />
                                                    <i className="click-arrow" />
                                                </div>
                                                <Button onClick={this.handleAddToCard} primary>
                                                    Добавить в корзину
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="product__cart-block-type">
                                            <ul
                                                data-behavior="utmCheck"
                                                className="product__cart-block-type-ul"
                                            >
                                                {items.map(item =>
                                                    item.available ? (
                                                        <li
                                                            className={`product__cart-block-type-ul-li ${
                                                                selectedProduct.id === item.id
                                                                    ? 'product__cart-block-type-ul-li-active'
                                                                    : ''
                                                            }`}
                                                            onClick={() => this.handleChangeItem(item.id)}
                                                        >
                                                            <div className="product__cart-block-type-ul-li-container">
                                                                <img
                                                                    className="product__cart-block-type-ul-li-container-img"
                                                                    src="https://laparfumerie.ru/item/2015/01/18/23599_45305_353568.jpg.smaller.jpg"
                                                                    alt={item.name}
                                                                />
                                                            </div>
                                                            <div className="product__cart-block-type-ul-li-nameblock">
                                                                {item.name}
                                                                <div className="product__cart-block-type-ul-li-nameblock-price">
                                                                    {item.prices.sale_price
                                                                        ? item.prices.sale_price.value
                                                                        : item.prices.final_price.value}
                                                                    <span className="product__cart-block-type-ul-li-nameblock-currer">
                                                                        руб.
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ) : (
                                                        <li className="product__cart-block-type-ul-li--not_available">
                                                            <div className="product__cart-block-type-ul-li-container">
                                                                <img
                                                                    src="https://laparfumerie.ru/item/2015/06/03/22842_53746_377759.jpg.smaller.jpg"
                                                                    alt={item.name}
                                                                    className="product__cart-block-type-ul-li-container-img"
                                                                />
                                                            </div>
                                                            <div className="product__cart-block-type-ul-li-nameblock">
                                                                Туалетная вода 1.2 мл
                                                                <div className="product__cart-block-type-ul-li-nameblock-available">
                                                                    Ожидает поступления
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product__row">
                                <div className="product__options">
                                    <h3 className="product-element__label">Характеристики товара</h3>
                                    <ul className="product-element__datalist">
                                        <li className="product-element__datalist--data">Бренд:</li>
                                        <li className="product-element__datalist--data__last">
                                            <a href="/duhi-armand-basi/"> Armand Basi </a>
                                        </li>
                                    </ul>
                                    <div>
                                        <h3 className="product-element__label--thick-inner">
                                            Описание товара
                                        </h3>
                                        <div className="product-element__textlist rte">
                                            <RichText>
                                                <p>
                                                    Раскрыть свою неповторимость, почувствовать прилив
                                                    невероятной энергии в любое время года легко, если у вас
                                                    имеется туалетная вода In Red
                                                    <a href="https://laparfumerie.ru/duhi-armand-basi/">
                                                        <strong>Armand Basi </strong>
                                                    </a>
                                                    (Ин Ред от Арманд Баси). Воздушный, нежный аромат — это
                                                    смелый синтез авангардизма и традиций классики модного
                                                    дома, который хочется заказать, чтобы познакомиться с ним.
                                                    Индивидуальность, внутренняя сила, уверенность — вот
                                                    главные качества обладательницы In Red. Верхние ноты
                                                    являют собой сплетение пикантного кардамона, сочного
                                                    бергамота, пряного имбиря и чуть горьковатого мандарина.
                                                    Сердце аромата полностью и без остатка принадлежит
                                                    цветочному ансамблю из весеннего ландыша, фиалки,
                                                    очаровательного жасмина и благоухающей розы. Это нежное
                                                    соцветие переходит в древесное послевкусие из нот мускуса
                                                    и мха. Доступная цена In Red от
                                                    <strong> Armand Basi</strong> в сочетании с затейливым
                                                    дизайном флакона привлекает к себе внимание уже больше 10
                                                    лет. Потому аромат заслуживает самых лучших отзывов со
                                                    стороны покупательниц. Испанская страсть парфюмерной
                                                    композиции In Red заряжает положительными эмоциями каждый
                                                    день. Вдохнув однажды запах туалетной воды от
                                                    <strong> Armand Basi</strong>, хочется тут же купить ее
                                                    себе.
                                                </p>
                                            </RichText>
                                        </div>
                                    </div>
                                </div>
                                <div className="product__merch">
                                    <h3 className="product-element__label">Другие товары In Red</h3>
                                    <div className="small_catalog">
                                        <div className="catalog carousel-4o2s163">
                                            <div className="catalog__item">
                                                <a
                                                    href="/armand-basi-nabor-in-red2.htm"
                                                    className="catalog__item_link"
                                                >
                                                    <div className="catalog__item_img">
                                                        <img
                                                            src="/product/2016/07/20/23041_81112_659324_ru.jpg.product.jpg"
                                                            className="catalog__item_img-im--first"
                                                        />
                                                        <img
                                                            src="/product/2016/07/20/23041_81113_659325_ru.jpg.product.jpg"
                                                            className="catalog__item_img-im--second"
                                                        />
                                                    </div>
                                                    <h2 className="catalog__item_brand">Armand Basi</h2>
                                                    <h3 className="catalog__item_name">
                                                        Набор Armand Basi In Red
                                                    </h3>
                                                </a>
                                                <p className="catalog__item_price">
                                                    <span className="catalog__item_price--soldout">
                                                        Ожидается поступление
                                                    </span>
                                                </p>
                                                <div className="catalog__item_prd">
                                                    <a
                                                        href="/armand-basi-nabor-in-red2.htm"
                                                        className="catalog__item_prd_button"
                                                    >
                                                        Обзор
                                                    </a>
                                                </div>
                                            </div>
                                            <a data-handle="control-left" href="#">
                                                <img src="/img/asset/left-arrow.png" />
                                            </a>
                                            <a data-handle="control-right" href="#">
                                                <img src="/img/asset/right-arrow.png" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product__row">
                                <div className="product__options">
                                    <div className="product-element__info">
                                        <h3 className="product-element__label">Отзывы: {name}</h3>
                                        <h2 className="product-element__comment--head">
                                            Оценка нашими покупателями в {comments.length} оставленных отзывaх
                                        </h2>
                                        <ul>
                                            {comments.map(item => (
                                                <Comment key={item.id} {...item} />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="product__merch">
                                    <h3 className="product-element__label">
                                        Оставить отзыв на товар: {name}
                                    </h3>
                                    <CommentForm />
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}
