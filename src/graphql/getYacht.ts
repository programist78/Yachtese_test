import { gql } from '@apollo/client'
import { YachtDataType } from '../stores/useYachtPageStore'

export const GET_YACHT = gql`
    query GetYachtById($id: String!) {
        getYachtById(_id: $id) {
            yachtRoute {
                title
                time
                lon
                lat
                status
            }
            userName
            teamMates
            _id
            avatarURL
            companyName
            connectedYachtCompany
            email
            contactInfo {
                name
                link
            }
            departments
        }
    }
`

export interface getYachtResponse {
    getYachtById: YachtDataType
}

export interface getYachtInput {
    id: string
}