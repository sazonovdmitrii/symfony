import gql from 'graphql-tag';

import { Products, Address, Addresses } from 'fragments';

export const ADD_TO_BASKET = gql`
    mutation addBasket($input: AddBasketInput!) {
        addBasket(input: $input) {
            ...Products
        }
    }
    ${Products}
`;

export const UPDATE_PRODUCT_MUTATION = gql`
    mutation updateProduct($input: UpdateBasketInput!) {
        updateBasket(input: $input) {
            ...Products
        }
    }
    ${Products}
`;

export const REMOVE_PRODUCT_MUTATION = gql`
    mutation removeProduct($input: AddBasketInput!) {
        removeBasket(input: $input) {
            ...Products
        }
    }
    ${Products}
`;

export const CREATE_ADDRESS_MUTATION = gql`
    mutation createAddress($input: CreateAddressInput!) {
        createAddress(input: $input) {
            ...Address
        }
    }
    ${Address}
`;

export const UPDATE_ADDRESS_MUTATION = gql`
    mutation updateAddress($input: UpdateAddressInput!) {
        updateAddress(input: $input) {
            ...Addresses
        }
    }
    ${Addresses}
`;

export const REMOVE_ADDRESS_MUTATION = gql`
    mutation removeAddress($input: RemoveAddressInput!) {
        removeAddress(input: $input) {
            ...Addresses
        }
    }
    ${Addresses}
`;

export const ORDER_MUTATION = gql`
    mutation createOrder($input: OrderInput) {
        order(input: $input) {
            id
        }
    }
`;
