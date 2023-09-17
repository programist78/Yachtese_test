import { gql } from '@apollo/client'

export const REMOVE_FROM_FAVORITE_CHATS = gql`
    mutation Mutation($id: String!) {
        removeFromFavoriteChat(_id: $id) {
            chats
            favoriteChats
        }
    }
`

export interface removeFromFavoriteChatsResponse {
    chats: Array<string>
    favoriteChats: Array<string>
} 

export interface removeFromFavoriteChatsInput {
    id: string
}