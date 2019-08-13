import React from 'react';

import SEO from '../globalMeta';

export default ({ bundle, helmet }) => (
    <html lang="ru" {...helmet.htmlAttributes.toString()}>
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta httpEquiv="Content-Language" content="ru" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>LaParfumerie.ru - Ошибка 500</title>
            {bundle.getStyleElements()}
            <style>
                {`
                    body {
                        color: white;
                        background: #000;
                    }

                    .grid {
                        width: 1140px;
                        padding: 0 20px;
                        margin: 0 auto;
                    }

                    .page-header {
                        height: 112px;
                        line-height: 112px;
                        text-align: right;
                    }

                    .page-header .content {
                        height: 100%;
                        background: url(/images/errors/500-logo.png) left center no-repeat;
                    }

                    .page-header .phone {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 29px;
                        margin-left: 30px;
                        margin-right: 20px;
                    }

                    .page-wrapper {
                        height: 100%;
                        height: calc(100vh - 112px);
                        background: no-repeat url(/images/errors/500-bg.jpg) top center / cover;
                    }

                    .content-text {
                        box-sizing: border-box;
                        position: relative;
                        left: 50%;
                        width: 50%;
                        padding: 104px 20px 20px 89px;
                    }

                    .content-text p {
                        margin-bottom: 15px;
                    }

                    p.large-text {
                        margin-top: 23px;
                        font-weight: bold;
                        font-size: 64px;
                        line-height: 0.92;
                        text-indent: -6px;
                        letter-spacing: -1px;
                    }

                    p.medium-text {
                        margin: 16px 0 31px;
                        font-size: 43px;
                        text-indent: -2px;
                        font-weight: 300;
                    }

                    p.text {
                        font-size: 28px;
                        font-weight: 300;
                    }

                    @media (max-width: 960px) {
                        .grid {
                            box-sizing: border-box;
                            width: 100%;
                        }

                        .content-text {
                            left: 0;
                            width: 440px;
                            padding: 104px 0px 20px;
                            margin-left: auto;
                        }

                        .page-header .phone {
                            margin-left: 15px;
                            margin-right: 10px;
                        }
                    }

                    @media (max-width: 865px) {
                        .page-header .phone {
                            display: block;
                            line-height: 30px;
                            position: relative;
                            top: 27px;
                        }
                    }

                    @media (max-width: 600px) {
                        .page-header {
                            height: 160px;
                        }

                        .page-header .content {
                            background-position: center 10px;
                        }

                        .page-header .phone {
                            text-align: center;
                            top: 83px;
                        }

                        .content-text {
                            margin-right: auto;
                            width: 330px;
                            padding-top: 46px;
                        }
                    }

                    @media (max-width: 360px) {
                        .page-header .content {
                            background-position: center 16px;
                            background-size: 280px;
                        }

                        .page-wrapper {
                            overflow: hidden;
                        }

                        .content-text {
                            margin-left: -15px;
                        }
                    }
                `}
            </style>
        </head>
        <body>
            <header class="page-header">
                <div class="content grid">
                    <p class="phone">{SEO.phone.moscow}</p>
                    <p class="phone">{SEO.phone.russia}</p>
                </div>
            </header>
            <main class="page-wrapper">
                <div class="content grid">
                    <div class="content-text">
                        <p class="large-text">Ошибка 500</p>
                        <p class="medium-text">Мы обновляем сайт.</p>
                        <p class="text">
                            Пожалуйста, зайдите позже.
                            <br />
                            Приносим свои извинения за доставленные неудобства.
                        </p>
                    </div>
                </div>
            </main>
        </body>
    </html>
);
