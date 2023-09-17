import { gql } from '@apollo/client'
import { UserRoles, UserRolesType } from '../config/constants'

export const GET_MESSAGES = gql`
    query GetMessages($getMessagesInput: GetMessagesInput) {
        getMessages(getMessagesInput: $getMessagesInput) {
            createdAt
            message
            user {
                userName
                avatarURL
                _id
            }
        }
    }
`
//add role
export interface getMessagesInput {
    getMessagesInput: {
        chatId: string
    }
}

export interface getMessagesResponse {
    getMessages: Array<{
        createdAt: string,
        message: string,
        user: {
          userName: string,
          avatarURL: string,
          _id: string
          role: UserRolesType
          createdAt: string
        }
      }>
}