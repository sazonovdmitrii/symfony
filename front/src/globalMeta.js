import React, { Fragment } from 'react';

const data = {
    url: `https://laparfumerie.ru`,
    domain: 'laparfumerie.ru',
    siteName: 'Laparfumerie.ru',
    fullSiteName: 'ООО «Интернет магазин парфюмерии и косметики – Laparfumerie.ru» ',
    title: '',
    work_time: '',
    phone: {
        moscow: '+7 (495) 539 53 15',
        russia: '8 (800) 100 53 15',
    },
};

const socials = ({ title, description, type = 'article', siteName, url, locale = 'ru_RU' }) => {
    return (
        <Fragment>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={data.fullSiteName} />
            <meta property="og:url" content={`https://laparfumerie.ru${og_url}`} />
            <meta property="og:locale" content={locale} />
        </Fragment>
    );
};

export default {
    default: {
        title: '',
    },
    home: {
        description: 'Продаем элитную парфюмерию и косметику для женщин и мужчин с доставкой',
        keywords: 'парфюмерия, духи, интернет магазин парфюмерии, laparfumerie, лапарфюмерия',
    },
    content: {
        title: `Информационные статьи интернет магазина парфюмерии ${data.siteName}`,
        description: `Контакты интернет магазина парфюмерии ${data.siteName}`,
        keywords: 'контакты, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    brands: {
        title: `Все бренды парфюмерии и косметики | Интернет магазин парфюмерии и косметики – ${
            data.siteName
        }`,
        description: `Парфюмерия и Косметика с доставкой по Москве. Работаем ${data.work_time}. Звоните ${
            data.phone.moscow
        } или ${data.phone.russia}`,
        keywords: 'парфюмерные бренды, бренды духов, интернет магазин парфюмерии, laparfumerie, лапарфюмерия',
    },
    comments: {
        title: `Отзывы о парфюмерии и косметике. Интернет магазин ${data.siteName}`,
        description:
            'Последние отзывы о брендовой парфюмерии и косметики. Актуальная информация о мужских и женских духах.',
        keywords:
            'отзывы о духах, парфюмерия отзывы, мнения о духах, мнения о парфюмерии, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    sitemap: {
        title: `Карта сайта | ${data.title}`,
        description: `Парфюмерия и Косметика с доставкой по Москве. Работаем ${data.work_time}. Звоните  ${
            data.phone.moscow
        } или ${data.phone.russia}`,
        keywords: 'карта сайта, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    'sales-leader': {
        title: `Лидеры продаж парфюмерии - большой каталог, низкие цены | Купить с доставкой по Москве и России в интернет магазине ${
            data.siteName
        }`,
        description: `Продаем парфюмерию - лидеры продаж с доставкой по Москве и России. Работаем ${
            data.work_time
        }. Звоните ${data.phone.moscow} или ${data.phone.russia}`,
        keywords:
            'лидеры продаж парфюмерии, бренды парфюмерии лидеры продаж, лидеры продаж, духи лидеры продаж, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    new: {
        title: `Новинки парфюмерии 2014 года. Купить с доставкой по Москве и России. Интернет магазин ${
            data.siteName
        }`,
        description: `Продаем парфюмерию Новинки с доставкой по Москве. Работаем ${
            data.work_time
        }. Звоните  ${data.phone.moscow} или ${data.phone.russia}`,
        keywords:
            'новые поступления парфюмерии, новинки парфюмерии, купить новинки парфюмерии, новинки духов, купить новые духи, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    articles: {
        title: `Информационные статьи в интернет магазине ${data.siteName}`,
        description: `Раздел информационных статей интернет магазина парфюмерии ${data.siteName}`,
        keywords: 'Информационная статья, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    article: {
        title: name => `${name} информационные статьи в интернет магазине ${data.siteName}`,
        description: name =>
            `${name} раздел информационных статей интернет магазина парфюмерии ${data.siteName}`,
        keywords: name =>
            `${name} информационная статья, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии`,
    },
    catalog: ({ name, page, minPrice }) => {
        return {
            title: `${name} - купить с доставкой по Москве и России - фото, цена, отзывы в интернет-магазине ${
                data.siteName
            }!${page > 1 ? ` Cтраница ${page}` : ''}`,
            description: `${name}${
                minPrice ? ` по цене от ${minPrice} руб` : ''
            } с доставкой по Москве и России. Работаем c 8:00 до 17:00. Звоните ${data.phone.moscow} или ${
                data.phone.russia
            }`,
            keywords: `${name} интернет-магазин ${data.siteName}`,
        };
    },
    product: ({ name, items = [] }) => {
        return {
            title: `${name} - Купить с доставкой по Москве и России. Фото, цена, отзывы!`,
            keywords: `${items.map(({ node }) => node.name).join(', ')} купить`,
            description: `Продаем ${name} на заказ с доставкой по Москве. Работаем c 8:00 до 17:00. Звоните ${
                data.phone.moscow
            } или ${data.phone.russia}`,
        };
    },
};
