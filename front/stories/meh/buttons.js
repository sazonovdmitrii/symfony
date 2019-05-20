import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import Button from 'components/Button';

const kinds = ['primary', 'secondary'];
const sizes = ['large', '', 'small'];

storiesOf('Button', module)
    .addDecorator((story, context) => withInfo({ inline: true })(story)(context))
    .add('All buttons', () =>
        kinds.map(kind => (
            <Button onClick={action('clicked')} kind={kind}>
                {kind} button
            </Button>
        ))
    )
    .add('sizes', () =>
        sizes.map((size, index) => (
            <Button onClick={action('clicked')} size={size} kind={kinds[0]}>
                {size} button
            </Button>
        ))
    )
    .add('Button rounded', () => (
        <Button kind={kinds[0]} rounded>
            Button rounded
        </Button>
    ))
    .add('Button fullWidth', () => (
        <Button kind={kinds[0]} fullWidth>
            Button fullWidth
        </Button>
    ))
    .add('Button disabled', () =>
        kinds.map(kind => (
            <Button onClick={action('clicked')} kind={kind} disabled>
                {kind} button
            </Button>
        ))
    )
    .add('Button bold', () => (
        <Button kind={kinds[0]} bold>
            Button bold
        </Button>
    ))
    .add('Button uppercase', () => (
        <Button kind={kinds[0]} uppercase>
            Button uppercase
        </Button>
    ))
    // .add('ButtonGroup with 2 buttons', () => (
    //     <ButtonGroup>
    //         <Button>Button 1</Button>
    //         <Button>Button 2</Button>
    //     </ButtonGroup>
    // ))
    .add('IconButton', () => <Button icon="send" />)
    .add('IconButton with text', () => <Button icon="send">Send</Button>);
