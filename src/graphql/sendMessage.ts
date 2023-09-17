import { gql } from '@apollo/client'
import { Chat } from '../stores/useAuthStore'

export const SEND_MESSAGE = gql`
    mutation PostMessage($postMessageInput: PostMessageInput) {
        postMessage(postMessageInput: $postMessageInput) {
            _id
            lastMessage {
                user
                message
                created
            }
            user_1 {
                userName
                avatarURL
                _id
            }
            user_2 {
                userName
                avatarURL
                _id
            }
        }
    }
`

export interface sendMessageInput {
    postMessageInput: {
        chatId: string
        message: string
    } | {
        userId: string
        message: string
    }
}

export interface sendMessageResponse {
    postMessage: Chat
}