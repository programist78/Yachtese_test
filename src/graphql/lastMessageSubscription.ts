import { gql } from '@apollo/client'
import { MessageType } from '../stores/useMessagesStore'
import { Chat, Populate } from '../stores/useAuthStore'

export const LAST_MESSAGE = gql`
  subscription LastMessage {
  lastMessage {
    message {
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
    chat {
      _id
      createdAt
      user_1 {
        _id
        userName
        avatarURL
      }
      user_2 {
        _id
        userName
        avatarURL
      }
      messages
    }
  }
}
`

export interface lastMessageResponse {
  lastMessage: {
    message: MessageType
    chat: ChatWithoutLasMessage
  }
}

export interface ChatWithoutLasMessage {
  _id: string
  user_1: Populate
  user_2: Populate
  readStatus: boolean
}