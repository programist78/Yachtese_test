import { gql } from '@apollo/client'

export const RESET_PASSWORD = gql`
    mutation ResetPassword($setPasswordInput: UserSetPasswordInput) {
        setNewPassword(setPasswordInput: $setPasswordInput) {
            message
        }
    }
`

export interface resetPasswordResponse {
    setNewPassword: {
        message: string
    }
}

export interface resetPasswordInput {
    setPasswordInput: {
        token: string
        password: string
    }
}
