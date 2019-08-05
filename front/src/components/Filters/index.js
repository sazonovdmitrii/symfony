import React from 'react';
import PropTypes from 'prop-types';

import Select from 'components/Select';
import OldSelect from 'components/Select/oldSelect';

import styles from './styles.css';

const Filters = ({ items }) => {
    const handleChange = value => {
        console.log(value);
    };

    return (
        <div className={styles.row}>
            {items.map(({ id, name, childrens }) => {
                if (!childrens.length) return null;

                return (
                    <div key={id} className={styles.col}>
                        <OldSelect label={name} items={childrens} />
                    </div>
                );
            })}
            {/* <Select
                    label="Брэнд"
                    items={[
                        { value: 'Hugo Boss (241)', id: 1 },
                        { value: 'Nouvelle Etoile (Новая Заря) (237)', id: 2 },
                    ]}
                    onChange={handleChange}
                /> */}
        </div>
    );
};

Filters.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
};

export default Filters;
