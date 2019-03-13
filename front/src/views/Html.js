import React from 'react';

export default ({ cssFiles = [], helmet, html, scripts = [], styles, window = {} }) => (
    <html lang="ru" {...helmet.htmlAttributes.toString()}>
        <head>
            {helmet.title.toComponent()}
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta httpEquiv="Content-Language" content="ru" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {cssFiles.map(file => (
                <link key={file} rel="stylesheet" href={file} />
            ))}

            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {styles}
            {helmet.script.toComponent()}
            {helmet.noscript.toComponent()}
        </head>
        <body>
            <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
            <script
                dangerouslySetInnerHTML={{
                    __html: Object.keys(window).reduce(
                        (out, key) => (out += `window.${key}=${JSON.stringify(window[key])};`),
                        ''
                    ),
                }}
            />
            {scripts.map(script => (
                <script key={script} src={script} />
            ))}
        </body>
    </html>
);
