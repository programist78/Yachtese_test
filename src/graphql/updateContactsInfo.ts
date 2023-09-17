import { gql } from '@apollo/client'

export const UPDATE_CONTACTS_INFO = gql`
    mutation ChangeUserInfo($changeUserInfoInput: ChangeUserInfoInput) {
        changeUserInfo(changeUserInfoInput: $changeUserInfoInput) {
            contactInfo {
                name
                link
            }
        }
    }
`

export interface updateContactsInfoResponse {
    changeUserInfo: {
        contactInfo: Array<{
            name
            link
        }>
    }
}

export interface updateContactsInfoInput {
    changeUserInfoInput: {
        contactInfo: Array<{
            name
            link
        }>
    }
}