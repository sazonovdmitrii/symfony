import gql from 'graphql-tag';

// EXAMPLE
// export const CatalogPage = {
//     aromat: gql`
//         fragment AromatPage on Catalog {
//             name
//             count
//         }
//     `,
//     catalog: gql`
//         fragment CatalogPage on Catalog {
//             name
//             count
//         }
//     `,
// };

export const Address = gql`
    fragment Address on Addresses {
        data {
            id
            name
            person
            zip
            region_id
            city
            street
            house
            corp
            level
            flat
            code
        }
    }
`;
