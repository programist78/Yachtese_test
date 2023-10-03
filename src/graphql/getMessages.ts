import { gql } from '@apollo/client'
import { UserRolesType } from '../config/constants'

export const GET_MESSAGES = gql`
query Query($getMessagesInput: GetMessagesInput) {
  getMessages(getMessagesInput: $getMessagesInput) {
    messages {
      _id
      createdAt
      user {
        _id
        userName
        avatarURL
      }
      message
      readStatus
      images
    }
    offers {
      _id
      createdAt
      createdBy
      createdFor
      title
      description
      services
      accepted
      chatId
      fileUrl
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
      fileUrl: string[]
    }>
  }
}