import { gql } from '@apollo/client'

export const getUser = gql`
    query Query {
        getSupplierByToken {
            _id
            email
            imagesURL
            userName
        }
    }
`