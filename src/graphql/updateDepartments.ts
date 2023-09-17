import { gql } from '@apollo/client'

export const UPDATE_DEPARTMENTS = gql`
    mutation ChangeUserInfo($changeUserInfoInput: ChangeUserInfoInput) {
        changeUserInfo(changeUserInfoInput: $changeUserInfoInput) {
            departments
        }
    }
`

export interface updateDepartmentsResponse {
    changeUserInfo: {
        departments:Array<string>
    }
}

export interface updateDepartmentsInput {
    changeUserInfoInput: {
        departments:Array<string>
    }
} 