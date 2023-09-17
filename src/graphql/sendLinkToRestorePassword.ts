import { gql } from '@apollo/client'

export const SEND_LINK = gql`
    mutation ResetPassword($email: String!) {
        resetPassword(email: $email) {
            message
        }
    }
`

export interface sendPasswordLinkResponse {
    resetPassword: {
        message: string
      }
}

export interface sendPasswordLinkInput {
    email: string
}