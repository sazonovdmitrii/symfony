import React from 'react';

import vkIcon from './images/vk_soc.png';
import fbIcon from './images/fb_soc.png';
import okIcon from './images/ok_soc.png';
import instaIcon from './images/insta_soc.png';
import twitIcon from './images/twit_soc.png';

const defaultSocials = [
    {
        icon: vkIcon,
        url: 'https://vk.com/rulaparfumerie',
    },
    {
        icon: fbIcon,
        url: 'https://www.facebook.com/laparfumerie',
    },
    {
        icon: okIcon,
        url: 'http://ok.ru/laparfumerieru',
    },
    {
        icon: instaIcon,
        url: 'https://www.instagram.com/laparfumerieru/',
    },
    {
        icon: twitIcon,
        url: 'https://twitter.com/laparfumerieru',
    },
];

export default () => (
    <div className="share">
        <div className="share__label">Мы в социальных сетях</div>
        <ul className="share__list">
            {defaultSocials.map(({ icon, url }) => (
                <li key={url} className="share__item">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={icon} alt="" />
                    </a>
                </li>
            ))}
        </ul>
    </div>
);
