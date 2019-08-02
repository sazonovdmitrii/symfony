import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import classnames from 'classnames';

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

const HeaderMenu = ({ items, all_brands_top_menu = {}, className }) => {
    const [state, setState] = useState({ active: null });
    const menuClassName = classnames('mainmenu', className);

    const handleMouseEnter = index => {
        setState({ active: index });
    };
    const handleMouseLeave = () => {
        setState({ active: null });
    };

    return (
        <ul className={menuClassName} data-behavior="menuModule">
            {items.map(({ text, url, children }, index) => {
                const submenuClassName =
                    state.active !== index ? 'mainmenu__item--sub' : 'mainmenu__item opensubmenu';

                return (
                    <li
                        data-handle="opensubmenu"
                        className={submenuClassName}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link className="mainmenu__link" to={url}>
                            {text}
                        </Link>
                        {children.length
                            ? children.map(child => (
                                  <div data-render="submenu" class="mainmenu__submenu">
                                      <div class="mainmenu__submenu_column">
                                          {child.url ? (
                                              <span class="mainmenu__submenu_group">{child.text}</span>
                                          ) : (
                                              <a class="mainmenu__submenu_group" href={child.url}>
                                                  {child.text}
                                              </a>
                                          )}
                                          {child.children.length ? (
                                              <ul class="mainmenu__submenu_list">
                                                  {child.children.map(grandson => {
                                                      if (!grandson.url) return null;

                                                      return (
                                                          <li class="mainmenu__submenu_item">
                                                              <a
                                                                  class="mainmenu__submenu_link"
                                                                  href={grandson.url}
                                                              >
                                                                  {grandson.text}
                                                              </a>
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
                );
            })}
            <li className="mainmenu__item--search">
                <SearchForm />
            </li>
        </ul>
    );
};

export default () => {
    return (
        <Query query={GET_HEADER_MENU}>
            {({
                loading,
                error,
                data: {
                    top_menu: { data: items },
                },
            }) => {
                if (loading) return null;

                return <HeaderMenu items={items} />;
            }}
        </Query>
    );
};
