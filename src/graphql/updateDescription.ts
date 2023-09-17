import { gql } from '@apollo/client'

export const UPDATE_DESCRIPTION = gql`
    mutation ChangeUserInfo($changeUserInfoInput: ChangeUserInfoInput) {
        changeUserInfo(changeUserInfoInput: $changeUserInfoInput) {
            description
        }
    }
`

export interface updateDescriptionMuatationResponseType {
    changeUserInfo: {
        description: string
    }
}

export interface updateDescriptionMuatationInputType {
    changeUserInfoInput: {
        description: string
    }
}