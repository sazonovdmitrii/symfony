import React, { Fragment } from 'react';

export default {
    url: `https://laparfumerie.ru`,
    domain: 'laparfumerie.ru',
    siteName: 'Laparfumerie.ru',
    fullSiteName: 'ООО «Интернет магазин парфюмерии и косметики – Laparfumerie.ru»',
    title: '',
    work_time: 'Работаем c 8:00 до 17:00.',
    phone: {
        moscow: '+7 (495) 539 53 15',
        russia: '8 (800) 100 53 15',
    },
    email: 'info@laparfumerie.ru',
    text: {
        phone() {
            return `Звоните ${this.phone.moscow} или ${this.phone.russia}`;
        },
    },
    default: {
        title: '',
        // description: `Парфюмерия и Косметика с доставкой по Москве. ${this.work_time} ${this.text.phone()}`,
    },
    home: {
        description: 'Продаем элитную парфюмерию и косметику для женщин и мужчин с доставкой',
        keywords: 'парфюмерия, духи, интернет магазин парфюмерии, laparfumerie, лапарфюмерия',
    },
    content() {
        return {
            title: `Информационные статьи интернет магазина парфюмерии ${this.siteName}`,
            description: `Контакты интернет магазина парфюмерии ${this.siteName}`,
            keywords: 'контакты, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
        };
    },
    brands() {
        return {
            title: 'Все бренды парфюмерии и косметики',
            description: this.default.description,
            keywords:
                'парфюмерные бренды, бренды духов, интернет магазин парфюмерии, laparfumerie, лапарфюмерия',
        };
    },
    comments() {
        return {
            title: `Отзывы о парфюмерии и косметике. Интернет магазин ${this.siteName}`,
            description:
                'Последние отзывы о брендовой парфюмерии и косметики. Актуальная информация о мужских и женских духах.',
            keywords:
                'отзывы о духах, парфюмерия отзывы, мнения о духах, мнения о парфюмерии, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
        };
    },
    sitemap() {
        return {
            title: `Карта сайта | ${this.title}`,
            description: this.default.description,
            keywords: 'карта сайта, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
        };
    },
    'sales-leader'() {
        return {
            title: `Лидеры продаж парфюмерии - большой каталог, низкие цены | Купить с доставкой по Москве и России в интернет магазине ${
                this.siteName
            }`,
            description: `Продаем парфюмерию - лидеры продаж с доставкой по Москве и России. ${
                this.work_time
            } ${this.text.phone()}`,
            keywords:
                'лидеры продаж парфюмерии, бренды парфюмерии лидеры продаж, лидеры продаж, духи лидеры продаж, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
        };
    },
    new() {
        return {
            title: `Новинки парфюмерии 2014 года. Купить с доставкой по Москве и России. Интернет магазин ${
                this.siteName
            }`,
            description: `Продаем парфюмерию Новинки с доставкой по Москве. ${
                this.work_time
            } ${this.text.phone()}`,
            keywords:
                'новые поступления парфюмерии, новинки парфюмерии, купить новинки парфюмерии, новинки духов, купить новые духи, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
        };
    },
    articles() {
        return {
            title: `Информационные статьи в интернет магазине ${this.siteName}`,
            description: `Раздел информационных статей интернет магазина парфюмерии ${this.siteName}`,
            keywords:
                'Информационная статья, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
        };
    },
    article({ name }) {
        return {
            title: `${name} информационные статьи в интернет магазине ${this.siteName}`,
            description: `${name} раздел информационных статей интернет магазина парфюмерии ${this.siteName}`,
            keywords: `${name} информационная статья, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии`,
        };
    },
    catalog({ name, page, minPrice }) {
        return {
            title: `${name} - купить с доставкой по Москве и России - фото, цена, отзывы в интернет-магазине ${
                this.siteName
            }!${page > 1 ? ` Cтраница ${page}` : ''}`,
            description: `${name}${
                minPrice ? ` по цене от ${minPrice} руб` : ''
            } с доставкой по Москве и России. ${this.work_time} ${this.text.phone()}`,
            keywords: `${name} интернет-магазин ${this.siteName}`,
        };
    },
    product({ name, items = [] }) {
        return {
            title: `${name} - Купить с доставкой по Москве и России. Фото, цена, отзывы!`,
            keywords: `${items.map(({ node }) => node.name).join(', ')} купить`,
            description: `Продаем ${name} на заказ с доставкой по Москве. ${
                this.work_time
            } ${this.text.phone()}`,
        };
    },
    sale({ name }) {
        return {
            title: `${name} - акции парфюмерии и косметики | Интернет магазин парфюмерии и косметики - низкие цены, большой каталог, фото и отзывы. Купить духи с доставкой по Москве и России - ${
                this.siteName
            }`,
            description: `${name} акции парфюмерии и косметики. Продаем парфюмерию с доставкой по Москве. ${
                this.work_time
            } ${this.text.phone()}`,
        };
    },
};
