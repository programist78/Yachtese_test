import { gql } from '@apollo/client'
import { UserRoles, UserRolesType } from '../config/constants'

export const GET_MESSAGES = gql`
query Query($getMessagesInput: GetMessagesInput) {
  getMessages(getMessagesInput: $getMessagesInput) {
    offers {
      _id
      accepted
      chatId
      createdFor
      createdBy
      createdAt
      description
      services
      title
    }
    messages {
      user {
        userName
        avatarURL
        _id
      }
      readStatus
      message
      images
      createdAt
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
  getMessages: {
    messages: Array<{
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
    offers: Array<{
      _id: string
      accepted: boolean
      chatId: string
      createdFor: string
      createdBy: string
      createdAt: string
      description: string
      services: string[]
      title: string
    }>
  }
}