import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Radio from 'components/Radio';
import RadioGroup from 'components/RadioGroup';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

export default class Personal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: '',
            last_name: '',
            name: '',
            mid_name: '',
            phone: '',
            email_subscription: false,
            sms_subscription: false,
        };
    }
    handleChange = ({ target }, checked) => {
        const { name, value } = target;

        this.setState({
            [name]: checked || value,
        });
    };
    render() {
        const { gender, last_name, name, mid_name, phone, email_subscription, sms_subscription } = this.state;

        return (
            <form action="/user/personal/save" method="post" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div className="cabinet-content__column">
                    <InputGroup>
                        <Input
                            type="text"
                            name="last_name"
                            label="Фамилия"
                            value={last_name}
                            onChange={this.handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="text"
                            name="name"
                            label="Имя"
                            value={name}
                            onChange={this.handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="text"
                            name="mid_name"
                            label="Отчество"
                            value={mid_name}
                            onChange={this.handleChange}
                        />
                    </InputGroup>
                </div>
                <div className="cabinet-content__column">
                    <InputGroup>
                        <RadioGroup name="gender" value={gender} onChange={this.handleChange}>
                            <Radio value="" label="Не указан" />
                            <Radio value="male" label="Мужской" />
                            <Radio value="female" label="Женский" />
                        </RadioGroup>
                    </InputGroup>
                    <InputGroup>
                        <Input
                            type="tel"
                            name="phone"
                            value={phone}
                            label="Телефон"
                            placeholder="+7 (000) 000-00-00"
                            mask="+{7} (000) 000-00-00"
                            onChange={this.handleChange}
                            required
                        />
                    </InputGroup>
                    <fieldset className="cabinet-content__data">
                        <Checkbox
                            className="cabinet-content__data-check"
                            label="Получать уведомления о новых распродажах"
                            name="email_subscription"
                            value={email_subscription}
                            onChange={this.handleChange}
                        />
                        <Checkbox
                            className="cabinet-content__data-check"
                            label="Получать SMS-сообщения"
                            name="sms_subscription"
                            value={sms_subscription}
                            onChange={this.handleChange}
                        />
                    </fieldset>
                </div>
                <div className="cabinet-content__buttons">
                    <Button type="submit" role="submit" primary>
                        Сохранить
                    </Button>
                    <Button type="reset" secondary>
                        Отменить
                    </Button>
                </div>
            </form>
        );
    }
}
