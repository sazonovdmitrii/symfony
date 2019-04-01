import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        const { message, reply, author, date } = this.props;

        return (
            <div className="product-element__comment">
                <p>{message}</p>
                <div className="product-element__comment--author">
                    {author}, {date}
                    <i className="product-element__star--active" />
                    <i className="product-element__star--active" />
                    <i className="product-element__star--active" />
                    <i className="product-element__star--active" />
                </div>
                {reply && (
                    <div className="product-element__comment--reply">
                        {reply.message}
                        <br />
                        {reply.author}
                    </div>
                )}
            </div>
        );
    }
}

export default Comment;
