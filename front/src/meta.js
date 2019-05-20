const data = {
    title: '',
    work_time: '',
    phone: {
        moscow: '',
        russia: '',
    },
};

export default {
    home: {
        metaDescription: 'Продаем элитную парфюмерию и косметику для женщин и мужчин с доставкой',
        keywords: 'парфюмерия, духи, интернет магазин парфюмерии, laparfumerie, лапарфюмерия',
    },
    content: {
        title: 'Информационные статьи интернет магазина парфюмерии Laparfumerie.ru',
        metaDescription: 'Контакты интернет магазина парфюмерии Laparfumerie.ru',
        keywords: 'контакты, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    brands: {
        title:
            'Все бренды парфюмерии и косметики | Интернет магазин парфюмерии и косметики – Laparfumerie.ru',
        metaDescription: `Парфюмерия и Косметика с доставкой по Москве. Работаем ${data.work_time}. Звоните ${
            data.phone.moscow
        } или ${data.phone.russia}`,
        keywords: 'парфюмерные бренды, бренды духов, интернет магазин парфюмерии, laparfumerie, лапарфюмерия',
    },
    comments: {
        title: 'Отзывы о парфюмерии и косметике. Интернет магазин laparfumerie.ru',
        metaDescription:
            'Последние отзывы о брендовой парфюмерии и косметики. Актуальная информация о мужских и женских духах.',
        keywords:
            'отзывы о духах, парфюмерия отзывы, мнения о духах, мнения о парфюмерии, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    sitemap: {
        title: `Карта сайта | ${data.title}`,
        metaDescription: `Парфюмерия и Косметика с доставкой по Москве. Работаем ${
            data.work_time
        }. Звоните  ${data.phone.moscow} или ${data.phone.russia}`,
        keywords: 'карта сайта, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    'sales-leader': {
        title:
            'Лидеры продаж парфюмерии - большой каталог, низкие цены | Купить с доставкой по Москве и России в интернет магазине laparfumerie.ru',
        metaDescription: `Продаем парфюмерию - лидеры продаж с доставкой по Москве и России. Работаем ${
            data.work_time
        }. Звоните ${data.phone.moscow} или ${data.phone.russia}`,
        keywords:
            'лидеры продаж парфюмерии, бренды парфюмерии лидеры продаж, лидеры продаж, духи лидеры продаж, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    new: {
        title:
            'Новинки парфюмерии 2014 года. Купить с доставкой по Москве и России. Интернет магазин Laparfumerie.ru',
        metaDescription: `Продаем парфюмерию Новинки с доставкой по Москве. Работаем ${
            data.work_time
        }. Звоните  ${data.phone.moscow} или ${data.phone.russia}`,
        keywords:
            'новые поступления парфюмерии, новинки парфюмерии, купить новинки парфюмерии, новинки духов, купить новые духи, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    articles: {
        title: 'Информационные статьи в интернет магазине Laparfumerie.ru',
        metaDescription: 'Раздел информационных статей интернет магазина парфюмерии Laparfumerie.ru',
        keywords: 'Информационная статья, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии',
    },
    article: {
        title: `${vrs.texts.content_title} информационные статьи в интернет магазине Laparfumerie.ru`,
        metaDescription: `${
            vrs.texts.content_title
        } раздел информационных статей интернет магазина парфюмерии Laparfumerie.ru`,
        keywords: `${
            vrs.texts.content_title
        } информационная статья, laparfumerie, лапарфюмерия, интернет магазин духов и парфюмерии`,
    },
};
