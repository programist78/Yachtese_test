import { gql } from '@apollo/client'

export const ADD_YACHT = gql`
    mutation Mutation($email: String) {
        addYacht(email: $email) {
            _id
        }
    }

`