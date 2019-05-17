import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import Input from 'components/Input';
import Radio from 'components/Radio';
import RadioGroup from 'components/RadioGroup';
import Checkbox from 'components/Checkbox';
import Select from 'components/Select';
import InputGroup from 'components/InputGroup';

storiesOf('Forms', module)
    .addDecorator((story, context) => withInfo({ inline: true })(story)(context))
    .add('Input', () => <Input label="label" onChange={action('change')} />)
    .add('Input with text', () => <Input label="label" text="text" onChange={action('change')} />)
    .add('Input with error', () => <Input label="label" text="text" onChange={action('change')} error />)
    .add('Input required', () => <Input label="label" required />)
    .add('Input disabled', () => <Input label="label" disabled />)
    .add('InputGroup', () => (
        <InputGroup column={4}>
            <Input label="label" />
            <Input label="label" />
        </InputGroup>
    ))
    .add('Radio', () => <Radio label="label" onChange={action('change')} checked />)
    .add('RadioGroup', () => (
        <RadioGroup name="name" onChange={action('clicked')} value="foo">
            <Radio value="foo" label="label" />
            <Radio value="bar" label="label" />
        </RadioGroup>
    ))
    .add('Checkbox', () => <Checkbox name="name" label="label" onChange={action('change')} />)
    .add('Checkbox disabled', () => (
        <Fragment>
            <Checkbox name="name" label="label" onChange={action('change')} disabled />
            <Checkbox name="name" label="label" onChange={action('change')} disabled checked />
        </Fragment>
    ))
    .add('Select', () => (
        <Select
            label="label"
            items={[
                { value: 'Hugo Boss (241)', id: 1 },
                { value: 'Nouvelle Etoile (Новая Заря) (237)', id: 2 },
            ]}
            onChange={action('change')}
        />
    ));
