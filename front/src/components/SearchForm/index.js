import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Input from 'components/Input';

const SearchForm = ({ history }) => {
    const [search, setSearch] = useState('');
    const handleSubmit = e => {
        e.preventDefault();

        if (!search) return;

        history.push(`/search/?search=${search}`);
    };

    return (
        <form method="GET" action="/search/" className="searchform" onSubmit={handleSubmit}>
            <Input
                name="search"
                value={search}
                placeholder="Искать"
                theme={{ input: 'searchform__input' }}
                onChange={({ target: { value } }) => setSearch(value)}
            />
            <button type="submit" className="searchform__icon flaticon-magnifying-glass" />
        </form>
    );
};

SearchForm.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(SearchForm);
