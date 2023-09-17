import { gql } from '@apollo/client'

export const UPDATE_USER_NAME = gql`
    mutation ChangeUserInfo($changeUserInfoInput: ChangeUserInfoInput) {
        changeUserInfo(changeUserInfoInput: $changeUserInfoInput) {
            userName
        }
    }
`

export interface updateUserMuatationResponseType {
    changeUserInfo: {
        userName: string
    }
}

export interface updateUserMuatationInputType {
    changeUserInfoInput: {
        userName: string
    }
}