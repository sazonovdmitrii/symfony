import React, { useState, useEffect } from 'react';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';

const Security = () => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [rePass, setRePass] = useState('');

    return (
        <div className="cabinet-content__column--center">
            <form>
                <InputGroup>
                    <Input
                        type="password"
                        label="Текущий пароль"
                        name="old_pass"
                        value={oldPass}
                        onChange={({ target: { value } }) => setOldPass(value)}
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        type="password"
                        label="Новый пароль"
                        name="new_pass"
                        value={newPass}
                        onChange={({ target: { value } }) => setNewPass(value)}
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        type="password"
                        label="Повторите новый пароль"
                        name="re_pass"
                        value={rePass}
                        onChange={({ target: { value } }) => setRePass(value)}
                    />
                </InputGroup>
                <InputGroup>
                    <Button kind="primary">Сохранить</Button>
                </InputGroup>
            </form>
        </div>
    );
};

export default Security;
