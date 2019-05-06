import React from 'react';

import Select from 'components/Select';
import OldSelect from 'components/Select/oldSelect';

import styles from './styles.css';

const Filters = props => {
    const handleChange = value => {
        console.log(value);
    };

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <Select
                    label="Брэнд"
                    items={[
                        { value: 'Hugo Boss (241)', id: 1 },
                        { value: 'Nouvelle Etoile (Новая Заря) (237)', id: 2 },
                    ]}
                    onChange={handleChange}
                />
                <OldSelect
                    label="Брэнд"
                    items={[
                        { value: 'Hugo Boss (241)', id: 1, url: '/' },
                        { value: 'Nouvelle Etoile (Новая Заря) (237)', id: 2, url: '/' },
                    ]}
                />
            </div>
        </div>
    );
};

export default Filters;
