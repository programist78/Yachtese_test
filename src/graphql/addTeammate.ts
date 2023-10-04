import { gql } from '@apollo/client'

export const ADD_TEAMMATE = gql`
    mutation DeleteUser($email: String) {
        addTeamMate(email: $email) {
            _id
        }
    }
`