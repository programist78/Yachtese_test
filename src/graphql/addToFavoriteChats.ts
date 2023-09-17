import { gql } from '@apollo/client'

export const ADD_CHAT_TO_FAVORITE = gql`
    mutation Mutation($id: String!) {
        addToFavoriteChat(_id: $id) {
            favoriteChats
            chats
        }
    }
`

export interface addToFavoriteChatsResponse {
    chats: Array<string>
    favoriteChats: Array<string>
}

export interface addToFavoriteChatsInput {
    id: string
}