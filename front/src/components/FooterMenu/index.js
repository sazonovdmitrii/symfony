import React from 'react';

export default ({ items = [] }) => {
    return items.map((item, index) => {
        return SEOHIDE && index >= 4 ? null : (
            <div key={index} className="footer__colum">
                <p className="footer__head">{item.title}</p>
                {item.children.map((child, i) => (
                    <ul key={i} className="footer__list">
                        <li className="footer__list_item">
                            <a href={child.url} className="footer__list_item_link">
                                {child.title}
                            </a>
                        </li>
                    </ul>
                ))}
            </div>
        );
    });
};
