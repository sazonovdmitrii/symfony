import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { GET_SALES } from 'query';

import SaleCard from 'components/SaleCard';

const Sales = ({ limit }) => (
    <div className="homesale">
        <Query query={GET_SALES} variabler={{ limit }}>
            {({ loading, error, data: { sale } }) => {
                if (loading) return 'loading';
                if (error) return 'erorr';

                return sale.data.map(item => (
                    <div className="homesale__sale">
                        <SaleCard key={item.id} {...item} />
                    </div>
                ));
            }}
        </Query>
    </div>
);

Sales.defaultProps = {
    limit: null,
};

Sales.propTypes = {};

export default Sales;
