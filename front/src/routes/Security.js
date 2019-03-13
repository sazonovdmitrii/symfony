import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';

export default class Security extends Component {
    constructor(props) {
        super(props);

        this.state = {
            old_pass: '',
            new_pass: '',
            re_pass: '',
        };
    }
    handleChange = ({ target }) => {
        const { name, value } = target;

        this.setState({
            [name]: value,
        });
    };
    render() {
        const { old_pass, new_pass, re_pass } = this.state;

        return (
            <div className="cabinet-content__column--center">
                <form>
                    <InputGroup>
                        <Input
                            type="password"
                            label="Текущий пароль"
                            name="old_pass"
                            value={old_pass}
                            onChange={this.handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="password"
                            label="Новый пароль"
                            name="new_pass"
                            value={new_pass}
                            onChange={this.handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="password"
                            label="Повторите новый пароль"
                            name="re_pass"
                            value={re_pass}
                            onChange={this.handleChange}
                        />
                    </InputGroup>
                </form>
            </div>
        );
    }
}
