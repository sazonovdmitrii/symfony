import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { seoHead } from 'utils';
import Button from 'components/Button';
import Tabs from 'components/Tabs';
import Tab from 'components/Tabs/Tab';
import TabsView from 'components/Tabs/TabsView';
import CommentForm from 'components/CommentForm';
import Comment from 'components/Comment';
import RichText from 'components/RichText';
import Select from 'components/Select';
import ProductCarousel from 'components/ProductCarousel';
import Snackbar from 'components/Snackbar';
import ArticlesPreview from 'components/ArticlesPreview';

import ProductItems from './ProductItems';

import bankReceiptIcon from './payments/bank-receipt.jpg';
import mastercardIcon from './payments/mc.jpg';
import cashIcon from './payments/cash.jpg';
import codIcon from './payments/cod.jpg';
import visaIcon from './payments/visa.jpg';
import yandexMoneyIcon from './payments/yandex.jpg';

const ADD_TO_BASKET = gql`
    mutation AddBasket($input: AddBasketInput!) {
        addBasket(input: $input) {
            products {
                item_id
            }
        }
    }
`;

const Product = ({
    name,
    id,
    items,
    images,
    brand_name,
    comments,
    likes,
    name_translit,
    vendor_code,
    match,
    description,
    tags,
    history,
}) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(items.edges[0].node);
    const handleChangeItem = ({ id, price: itemPrice }) => {
        if (!itemPrice) return;
        const newSelectedProduct = items.edges.find(item => item.node.id === id);

        if (newSelectedProduct && newSelectedProduct.node.id !== selectedProduct.id) {
            setSelectedProduct(newSelectedProduct.node);
        }
    };
    const handleChangeTab = ({ value }) => {
        setTabIndex(value);
    };
    const handleAddToCard = callback => {
        // const { selectedProduct } = this.state;
        // todo add to card

        callback({ variables: { input: { item_id: selectedProduct.id } } });
    };
    const handleCompleted = ({ addBasket: { products } }) => {
        console.warn('product added to basket', products);

        if (products) {
            history.push('/basket');
        }
    };

    return (
        <Fragment>
            {seoHead('product', { name, items: items.edges })}
            {error && <Snackbar theme="error" text={error} active={!!error} onClose={() => setError(null)} />}
            <div className="product" itemScope itemType="http://schema.org/Product">
                <meta itemProp="name" content={name} />
                <span
                    itemProp="offers"
                    itemScope
                    itemType="http://schema.org/AggregateOffer"
                    style={{ display: 'none' }}
                >
                    <meta itemProp="offerCount" content={items.edges.length} />
                    <meta itemProp="lowPrice" content={selectedProduct.price || 0} />
                    <meta itemProp="priceCurrency" content="RUB" />
                    <link
                        itemProp="availability"
                        href={
                            selectedProduct.price
                                ? 'http://schema.org/InStock'
                                : 'http://schema.org/OutOfStock'
                        }
                    />
                </span>
                <p className="admin-edit">
                    <a className="admin-edit__link" href={`http://mng.laparfumerie.ru/product/edit/${id}`}>
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
                            alt={brand_name}
                        />
                        <span
                            className="product__brand-name"
                            data-handle="pseudolinks"
                            data-path="/duhi-agent-provocateur/"
                        >
                            {brand_name}
                        </span>
                        <h1 className="product__brand-title">{name}</h1>
                        {name_translit && <p className="product__brand-subtitle">{name_translit}</p>}
                        <div className="product__brand-stat">
                            <div className="product__brand-stat-star">
                                <i className="product-element__star--active" />
                                <i className="product-element__star--active" />
                                <i className="product-element__star--active" />
                                <i className="product-element__star--active" />
                            </div>
                            <span className="product__brand-stat-review">
                                <Link to="#review">{comments.length} отзыв</Link>
                            </span>
                            <div className="product__brand-stat-like">
                                <i className="product__brand-stat-like-img" />
                                <span className="product__brand-stat-like-num">{likes} нравится</span>
                            </div>
                        </div>
                        <div className="product__brand-info">
                            <Tabs value={tabIndex} onChange={handleChangeTab}>
                                <Tab className="product__brand-info-li" active>
                                    Доставка
                                </Tab>
                                <Tab className="product__brand-info-li">
                                    Подарки к заказу
                                    <small className="gifts-json__count">2</small>
                                </Tab>
                                <Tab className="product__brand-info-li">Оплата</Tab>
                            </Tabs>
                            <TabsView index={tabIndex}>
                                <div className="product__brand-info-shipp product__brand-info-block">
                                    <p className="product__brand-info-shipp-p">
                                        Стоимость:{' '}
                                        <span data-render="minDelivery" data-price="[% need_delivery %]">
                                            Бесплатно от 666 руб
                                        </span>
                                    </p>
                                    <p className="product__brand-info-shipp-p">
                                        Доставка по Москве:{' '}
                                        <span
                                            data-render="delivery_string"
                                            className="product__brand-info-shipp-p-date"
                                        >
                                            666-666 дня
                                        </span>
                                    </p>
                                    <ul className="product__brand-info-shipp-ul">
                                        <p className="product__brand-info-shipp-ul-p">Способ доставки: </p>
                                        <li className="product__brand-info-shipp-ul-post">
                                            <Link to="/info/dostavka-pochta-rossii.htm">Почта России</Link>,
                                        </li>
                                        <li className="product__brand-info-shipp-ul-post">
                                            <Link to="/info/delivery-and-payment.htm">
                                                Собственная курьерская служба
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="product__brand-info-shipp product__brand-info-block">
                                    gifts
                                </div>
                                <div className="product__brand-info-shipp product__brand-info-block">
                                    <p className="product__brand-info-pay-name">Способы оплаты online:</p>
                                    {/* TODO lazyload */}
                                    <div className="product__brand-info-pay-imgs">
                                        <img
                                            className="product__brand-info-pay-icon"
                                            src={visaIcon}
                                            alt="visa"
                                            title="visa"
                                        />
                                        <img
                                            className="product__brand-info-pay-icon"
                                            src={mastercardIcon}
                                            alt="mastercard"
                                            title="mastercard"
                                        />
                                        <img
                                            className="product__brand-info-pay-icon"
                                            src={yandexMoneyIcon}
                                            alt="яндекс.деньги"
                                            title="яндекс.деньги"
                                        />
                                    </div>
                                    <p className="product__brand-info-pay-name">Способы оплаты наличными:</p>
                                    <div className="product__brand-info-pay-imgs">
                                        <img
                                            className="product__brand-info-pay-icon"
                                            src={codIcon}
                                            alt="наложенный платеж"
                                            title="наложенный платеж"
                                        />
                                        <img
                                            className="product__brand-info-pay-icon"
                                            src={bankReceiptIcon}
                                            alt="банковская квитанция"
                                            title="банковская квитанция"
                                        />
                                        <img
                                            className="product__brand-info-pay-icon"
                                            src={cashIcon}
                                            alt="оплата курьеру"
                                            title="оплата курьеру"
                                        />
                                    </div>
                                </div>
                            </TabsView>
                        </div>
                    </div>
                    <div className="product__image">
                        <ProductCarousel items={images} />
                    </div>
                    <div className="product__cart">
                        <div className="product__cart-block">
                            {selectedProduct && (
                                <Fragment>
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
                                    {selectedProduct.price && (
                                        <div className="product__cart-block-price">
                                            <strong className="product__cart-block-price-new">
                                                {selectedProduct.price}
                                                <span className="product__cart-block-price-currer">
                                                    руб.
                                                    <span />
                                                </span>
                                            </strong>
                                            <span className="product__cart-block-price-old">666 руб.</span>
                                            <span className="product__cart-block-price-sale">
                                                -13% по{' '}
                                                <Link to="/sales/elitnaya-parfyumeriya-na-22-aprelya/">
                                                    <span className="product__cart-block-price-sale-act">
                                                        акции
                                                    </span>
                                                </Link>
                                            </span>
                                        </div>
                                    )}
                                    <div className="product__cart-block-button">
                                        {1 || selectedProduct.price ? (
                                            <Mutation
                                                mutation={ADD_TO_BASKET}
                                                onCompleted={handleCompleted}
                                                onError={error => setError(error.message)}
                                            >
                                                {(addToCard, { loading, data }) => {
                                                    if (data && data.addBasket.id) {
                                                        return (
                                                            <Button to="/basket">Перейти в корзину</Button>
                                                        );
                                                    }

                                                    return (
                                                        <div className="product__cart-block-button-form product-item__frm">
                                                            {/* <div className="left-3">
                                                                <Select
                                                        className="select-group"
                                                                        items={[...new Array(10).keys()]}
                                                                        />
                                                    </div> */}
                                                            <Button
                                                                onClick={() => handleAddToCard(addToCard)}
                                                                kind="primary"
                                                                loading={loading}
                                                                bold
                                                                uppercase
                                                            >
                                                                Добавить в корзину
                                                            </Button>
                                                        </div>
                                                    );
                                                }}
                                            </Mutation>
                                        ) : (
                                            <Button bold uppercase disabled>
                                                Нет в наличии
                                            </Button>
                                        )}
                                    </div>
                                </Fragment>
                            )}
                            {items.edges.length > 1 && (
                                <div className="product__cart-block-type">
                                    <ProductItems
                                        items={items}
                                        active={selectedProduct}
                                        onChange={handleChangeItem}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="product__row">
                    <div className="product__options">
                        {tags.length ? (
                            <Fragment>
                                <h3 className="product-element__label">Характеристики товара</h3>
                                <ul className="product-element__datalist">
                                    {tags.map(({ name, value, url }) => (
                                        <Fragment>
                                            <li className="product-element__datalist--data">{name}:</li>
                                            <li className="product-element__datalist--data__last">
                                                {url ? <Link to={url}>{value}</Link> : value}
                                            </li>
                                        </Fragment>
                                    ))}
                                </ul>
                            </Fragment>
                        ) : null}
                        {description && (
                            <div>
                                <h3 className="product-element__label--thick-inner">Описание товара</h3>
                                <div className="product-element__textlist rte" itemProp="description">
                                    <RichText>{description}</RichText>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="product__merch">
                        <h3 className="product-element__label">Другие товары In Red</h3>
                        <div className="small_catalog">
                            <div className="catalog carousel-4o2s163">
                                <div className="catalog__item">
                                    <Link to="/armand-basi-nabor-in-red2.htm" className="catalog__item_link">
                                        <div className="catalog__item_img">
                                            <img
                                                src="/product/2016/07/20/23041_81112_659324_ru.jpg.product.jpg"
                                                className="catalog__item_img-im--first"
                                                alt=""
                                            />
                                            <img
                                                src="/product/2016/07/20/23041_81113_659325_ru.jpg.product.jpg"
                                                className="catalog__item_img-im--second"
                                                alt=""
                                            />
                                        </div>
                                        <h2 className="catalog__item_brand">Armand Basi</h2>
                                        <h3 className="catalog__item_name">Набор Armand Basi In Red</h3>
                                    </Link>
                                    <p className="catalog__item_price">
                                        <span className="catalog__item_price--soldout">
                                            Ожидается поступление
                                        </span>
                                    </p>
                                    <div className="catalog__item_prd">
                                        <Link
                                            to="/armand-basi-nabor-in-red2.htm"
                                            className="catalog__item_prd_button"
                                        >
                                            Обзор
                                        </Link>
                                    </div>
                                </div>
                                <a data-handle="control-left" href="#">
                                    <img src="/img/asset/left-arrow.png" alt="" />
                                </a>
                                <a data-handle="control-right" href="#">
                                    <img src="/img/asset/right-arrow.png" alt="" />
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
                        <h3 className="product-element__label">Оставить отзыв на товар: {name}</h3>
                        <CommentForm />
                    </div>
                </div>
                <ArticlesPreview />
            </div>
        </Fragment>
    );
};

Product.defaultProps = {
    items: [],
    name: 'Без названия',
    brand_name: null,
    images: [
        'https://laparfumerie.ru/product/2016/07/18/4271_80597_658713_ru.jpg.normal.jpg',
        'https://laparfumerie.ru/product/2016/07/01/4478_78658_656163_ru.jpg.normal.jpg',
    ],
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
    likes: 0,
    name_translit: null,
    vendor_code: '562292522',
};

Product.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    items: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.object),
    }),
    brand_name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    likes: PropTypes.number,
    name_translit: PropTypes.string,
    vendor_code: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    tags: PropTypes.arrayOf(PropTypes.object),
};

export default Product;
