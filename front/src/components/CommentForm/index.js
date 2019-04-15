import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Input from 'components/Input';
import InputGroup from 'components/InputGroup';

class CommentForm extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form action="/product/comment/add/24" method="post" className="comments-form">
                <div className="comments-notification" data-render="notification" />
                <div>
                    <div className="comments-stars1">
                        Оценка: &nbsp;
                        <input id="star-5" type="radio" name="star" value="5" />
                        <label htmlFor="star-5" className="comments-stars__item" />
                        <input id="star-4" type="radio" name="star" value="4" />
                        <label htmlFor="star-4" className="comments-stars__item" />
                        <input id="star-3" type="radio" name="star" value="3" />
                        <label htmlFor="star-3" className="comments-stars__item" />
                        <input id="star-2" type="radio" name="star" value="2" />
                        <label htmlFor="star-2" className="comments-stars__item" />
                        <input id="star-1" type="radio" name="star" value="1" />
                        <label htmlFor="star-1" className="comments-stars__item" />
                    </div>
                </div>
                <InputGroup>
                    <Input type="text" name="nick" label="Имя" className="input-text" required />
                </InputGroup>
                <InputGroup>
                    <Input
                        type="text"
                        name="nick"
                        label="E-mail"
                        className="input-text"
                        pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <Input type="textarea" name="comment" label="Коментарий" required />
                </InputGroup>
                <Button type="submit" className="product-element__feedbackbutton1" kind="primary">
                    Опубликовать
                </Button>
            </form>
        );
    }
}

export default CommentForm;
