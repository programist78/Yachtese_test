import { gql } from '@apollo/client'
import { MessageType } from '../stores/useMessagesStore'

export const GET_MESSAGES = gql`
  query GetMessages($getMessagesInput: GetMessagesInput) {
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
      offerId {
        _id
        createdFor
        title
        description
        services
        accepted
        fileUrl
      }
    }
  }
}
`
export interface getMessagesInput {
  getMessagesInput: {
    chatId: string
  }
}

export interface getMessagesResponse {
  getMessages: {
    messages: Array<MessageType>
  }
}