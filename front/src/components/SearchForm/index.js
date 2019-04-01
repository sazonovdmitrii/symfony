import React, { Component } from 'react';

import Input from 'components/Input';

export default class Name extends Component {
    handleSubmit = e => {
        e.preventDefault();

        // todo
    };

    render() {
        return (
            <form className="searchform" action="/search/" onSubmit={this.handleSubmit}>
                <Input
                    theme={{ input: 'searchform__input' }}
                    type="text"
                    name="search"
                    placeholder="Искать"
                />
                <button type="submit" className="searchform__icon flaticon-magnifying-glass" />
            </form>
        );
    }
}
