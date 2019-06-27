import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import Sales from 'components/Sales';

const SalesPage = () => {
    return (
        <Fragment>
            <div className="page-header">
                <h1 className="page-header__title">АКЦИИ</h1>
            </div>
            <Sales />
        </Fragment>
    );
};

export default SalesPage;
