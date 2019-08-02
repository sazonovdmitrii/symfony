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
        <ul className={menuClassName}>
            {items.map(({ text, url, children }, index) => (
                <li
                    className={`mainmenu__item--sub ${state.active === index ? 'opensubmenu' : ''}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link className="mainmenu__link" to={url}>
                        {text}
                    </Link>
                    {children.length
                        ? children.map(child => (
                              <div className="mainmenu__submenu">
                                  <div className="mainmenu__submenu_column">
                                      {child.url ? (
                                          <span className="mainmenu__submenu_group">{child.text}</span>
                                      ) : (
                                          <Link className="mainmenu__submenu_group" to={child.url}>
                                              {child.text}
                                          </Link>
                                      )}
                                      {child.children.length ? (
                                          <ul className="mainmenu__submenu_list">
                                              {child.children.map(grandson => {
                                                  if (!grandson.url) return null;

                                                  return (
                                                      <li className="mainmenu__submenu_item">
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

export default props => {
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

                return (
                    <HeaderMenu
                        {...props}
                        items={[
                            { text: 'Бренды', url: '/brands/', children: [] },
                            ...items,
                            { text: 'Акции', url: '/sales/', children: [] },
                        ]}
                    />
                );
            }}
        </Query>
    );
};
