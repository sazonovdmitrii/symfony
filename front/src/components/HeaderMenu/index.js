import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import SearchForm from 'components/SearchForm';

const GET_HEADER_MENU = gql`
    {
        top_menu {
            data {
                text
                url
                children {
                    text
                    url
                    children {
                        text
                        url
                    }
                }
            }
        }
    }
`;

const HeaderMenu = ({ items, className }) => {
    const [state, setState] = useState({ active: null });
    const menuClassName = classnames('mainmenu', className);
    const handleMouseEnter = index => {
        setState({ active: index });
    };
    const handleMouseLeave = () => {
        setState({ active: null });
    };

    if (!items.length) return null;

    return (
        <ul className={menuClassName}>
            {items.map(({ text, url, children }, index) => (
                <li
                    key={url}
                    className={`mainmenu__item--sub ${state.active === index ? 'opensubmenu' : ''}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link className="mainmenu__link" to={url}>
                        {text}
                    </Link>
                    {children.length
                        ? children.map(child => (
                              <div key={child.url} className="mainmenu__submenu">
                                  <div className="mainmenu__submenu_column">
                                      {child.url ? (
                                          <Link className="mainmenu__submenu_group" to={child.url}>
                                              {child.text}
                                          </Link>
                                      ) : (
                                          <span className="mainmenu__submenu_group">{child.text}</span>
                                      )}
                                      {child.children.length ? (
                                          <ul className="mainmenu__submenu_list">
                                              {child.children.map(grandson => {
                                                  if (!grandson.url) return null;

                                                  return (
                                                      <li
                                                          key={grandson.url}
                                                          className="mainmenu__submenu_item"
                                                      >
                                                          <Link
                                                              className="mainmenu__submenu_link"
                                                              to={grandson.url}
                                                          >
                                                              {grandson.text}
                                                          </Link>
                                                      </li>
                                                  );
                                              })}
                                          </ul>
                                      ) : null}
                                  </div>
                              </div>
                          ))
                        : null}
                </li>
            ))}
            <li className="mainmenu__item--search">
                <SearchForm />
            </li>
        </ul>
    );
};

HeaderMenu.defaultProps = {
    className: null,
    items: [],
};

HeaderMenu.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
};

export default props => {
    const {
        loading,
        error,
        data: { top_menu },
    } = useQuery(GET_HEADER_MENU);

    if (loading) return null;

    return (
        <HeaderMenu
            {...props}
            items={[
                { text: 'Бренды', url: '/brands/', children: [] },
                ...top_menu.data,
                { text: 'Акции', url: '/sales/', children: [] },
            ]}
        />
    );
};
