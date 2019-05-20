import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import Tabs from 'components/Tabs';
import Tab from 'components/Tabs/Tab';
import TabsView from 'components/Tabs/TabsView';
import CommentForm from 'components/CommentForm';
import Comment from 'components/Comment';
import RichText from 'components/RichText';
import Select from 'components/Select';

import ProductItems from './ProductItems';

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
}) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(items.edges[0].node);
    const handleChangeItem = ({ id, price: itemPrice }) => {
        if (!itemPrice) return;
        const newSelectedProduct = items.find(item => item.node.id === id);

        if (newSelectedProduct && newSelectedProduct.node.id !== selectedProduct.id) {
            setSelectedProduct(newSelectedProduct.node);
        }
    };

    const handleChangeTab = ({ value }) => {
        setTabIndex(value);
    };
    const handleAddToCard = () => {
        // const { selectedProduct } = this.state;
        // todo add to card
    };

    return (
        <div className="product">
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
                            <Link to="#review">
                                <i>{comments.length}</i> отзыва
                            </Link>
                        </span>
                        <div className="product__brand-stat-like">
                            <i className="product__brand-stat-like-img" />
                            <span className="product__brand-stat-like-num">
                                <i>{likes}</i> нравится
                            </span>
                        </div>
                    </div>
                    <div className="product__brand-info">
                        <Tabs value={tabIndex} onChange={handleChangeTab}>
                            <Tab className="product__brand-info-li" selected>
                                Доставка
                            </Tab>
                            <Tab className="product__brand-info-li">
                                Подарки к заказу
                                <span className="gifts-json__count">2</span>
                            </Tab>
                            <Tab className="product__brand-info-li">Оплата</Tab>
                        </Tabs>
                        <TabsView index={tabIndex}>
                            <div className="product__brand-info-shipp product__brand-info-block">tab1</div>
                            <div className="product__brand-info-shipp product__brand-info-block">tab2</div>
                            <div className="product__brand-info-shipp product__brand-info-block">tab3</div>
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
                        {selectedProduct && (
                            <Fragment>
                                <div className="product__cart-block-name">
                                    <h2 className="product__cart-block-name-h2">{selectedProduct.name}</h2>
                                    <p className="product__cart-block-name-art">
                                        Артикул{' '}
                                        <span className="product__cart-block-name-art-id">{vendor_code}</span>
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
                                    {selectedProduct.price ? (
                                        <div className="product__cart-block-button-form product-item__frm">
                                            {/* <div className="left-3">
                                                            <Select
                                                    className="select-group"
                                                                    items={[...new Array(10).keys()]}
                                                                    />
                                                </div> */}
                                            <Button onClick={handleAddToCard} kind="primary" bold uppercase>
                                                Добавить в корзину
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button bold uppercase disabled>
                                            Нет в наличии
                                        </Button>
                                    )}
                                </div>
                            </Fragment>
                        )}
                        {items.length > 1 && (
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
                    <h3 className="product-element__label">Характеристики товара</h3>
                    <ul className="product-element__datalist">
                        <li className="product-element__datalist--data">Бренд:</li>
                        <li className="product-element__datalist--data__last">
                            <Link to="/duhi-armand-basi/">Armand Basi</Link>
                        </li>
                    </ul>
                    <div>
                        <h3 className="product-element__label--thick-inner">Описание товара</h3>
                        <div className="product-element__textlist rte">
                            <RichText>
                                <p>
                                    Раскрыть свою неповторимость, почувствовать прилив невероятной энергии в
                                    любое время года легко, если у вас имеется туалетная вода In Red
                                    <Link to="/duhi-armand-basi/">
                                        <strong>Armand Basi </strong>
                                    </Link>
                                    (Ин Ред от Арманд Баси). Воздушный, нежный аромат — это смелый синтез
                                    авангардизма и традиций классики модного дома, который хочется заказать,
                                    чтобы познакомиться с ним. Индивидуальность, внутренняя сила, уверенность
                                    — вот главные качества обладательницы In Red. Верхние ноты являют собой
                                    сплетение пикантного кардамона, сочного бергамота, пряного имбиря и чуть
                                    горьковатого мандарина. Сердце аромата полностью и без остатка принадлежит
                                    цветочному ансамблю из весеннего ландыша, фиалки, очаровательного жасмина
                                    и благоухающей розы. Это нежное соцветие переходит в древесное послевкусие
                                    из нот мускуса и мха. Доступная цена In Red от
                                    <strong> Armand Basi</strong> в сочетании с затейливым дизайном флакона
                                    привлекает к себе внимание уже больше 10 лет. Потому аромат заслуживает
                                    самых лучших отзывов со стороны покупательниц. Испанская страсть
                                    парфюмерной композиции In Red заряжает положительными эмоциями каждый
                                    день. Вдохнув однажды запах туалетной воды от
                                    <strong> Armand Basi</strong>, хочется тут же купить ее себе.
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
        </div>
    );
};

Product.defaultProps = {
    items: [],
    name: 'Без названия',
    brand_name: null,
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
    likes: 0,
    name_translit: null,
    vendor_code: '562292522',
};

Product.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    brand_name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    likes: PropTypes.number,
    name_translit: PropTypes.string,
    vendor_code: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
};

export default Product;
