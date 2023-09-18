import { gql } from '@apollo/client'
import { UserRolesType } from '../config/constants'

export const LAST_MESSAGE = gql`
    subscription LastMessage {
  lastMessage {
    userName
    user
    role
    message
    isOffer
    created
    chatId
    avatarURL
  }
}
`

export interface lastMessageResponse {
    lastMessage: {
        userName: string
        user: string
        role: UserRolesType
        message: string
        isOffer: boolean
        created: string
        chatId: string
        avatarURL: string
    }
}