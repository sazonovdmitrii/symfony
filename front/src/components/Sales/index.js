import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { GET_SALES } from 'query';

import SaleCard from 'components/SaleCard';

const Sales = ({ limit }) => {
    const {
        loading,
        error,
        data: { sale },
    } = useQuery(GET_SALES, { variables: { limit } });
    if (loading) return 'loading';
    if (error) return 'error';

    return (
        <div className="homesale">
            {sale.data.map(item => (
                <div className="homesale__sale">
                    <SaleCard key={item.id} {...item} />
                </div>
            ))}
        </div>
    );
};

Sales.defaultProps = {
    limit: null,
};

Sales.propTypes = {
    limit: PropTypes.string,
};

export default Sales;
