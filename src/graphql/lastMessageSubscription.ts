import { gql } from '@apollo/client'

export const LAST_MESSAGE = gql`
    subscription Subscription {
        lastMessage {
            userName
            user
            message
            created
            avatarURL
            chatId
        }
    }
`

export interface lastMessageResponse {
    lastMessage: {
        avatarURL: string
        chatId: string
        created: string
        message: string
        user: string
        userName: string
    }
}