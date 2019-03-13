import React, { Component } from 'react';

import vkIcon from './images/vk_soc.png';
import fbIcon from './images/fb_soc.png';
import okIcon from './images/ok_soc.png';
import instaIcon from './images/insta_soc.png';
import twitIcon from './images/twit_soc.png';

export default () => (
    <div className="share">
        <div className="share__label">Мы в социальных сетях</div>
        <ul className="share__list">
            <li className="share__item">
                <a href="https://vk.com/rulaparfumerie">
                    <img src={vkIcon} alt="" />
                </a>
            </li>
            <li className="share__item">
                <a href="https://www.facebook.com/laparfumerie">
                    <img src={fbIcon} alt="" />
                </a>
            </li>
            <li className="share__item">
                <a href="http://ok.ru/laparfumerieru">
                    <img src={okIcon} alt="" />
                </a>
            </li>
            <li className="share__item">
                <a href="https://www.instagram.com/laparfumerieru/">
                    <img src={instaIcon} alt="" />
                </a>
            </li>
            <li className="share__item">
                <a href="https://twitter.com/laparfumerieru">
                    <img src={twitIcon} alt="" />
                </a>
            </li>
        </ul>
    </div>
);
