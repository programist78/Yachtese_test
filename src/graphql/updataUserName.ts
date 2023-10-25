import { gql } from '@apollo/client'

export const UPDATE_USER_NAME = gql`
    mutation ChangeUserInfo($changeUserInfoInput: ChangeUserInfoInput) {
        changeUserInfo(changeUserInfoInput: $changeUserInfoInput) {
            userName
            companyName
        }
    }
`

export interface updateUserMuatationResponseType {
    changeUserInfo: {
        userName: string
        companyName: string
    }
}

export interface updateUserMuatationInputType {
    changeUserInfoInput: {
        userName?: string
        companyName?: string
    }
}