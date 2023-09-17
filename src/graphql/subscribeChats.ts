import { gql } from '@apollo/client'

export const SUBSCRIBE_CHATS = gql`
    subscription AllChats($id: ID!) {
        allChats(_id: $id) {
            lastMessage {
                user
                message
                created
            }
        }
    }
`

export interface subcribeChatsResponse {
    postMessage: {
        messages: Array<{
            lastMessage: {
                user: string
                message: string
                created: string
            }
            user_1: {
                userName: string
                avatarURL: string
                _id: string
            }
            user_2: {
                userName: string
                _id: string
                avatarURL: string
            }
        }>
    }
}

export interface subscribeChatsInput {
    id: string
}