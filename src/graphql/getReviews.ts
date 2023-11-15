import { gql } from "@apollo/client"

export const GET_REVIEW = gql`
    query GetUserReviews($userId: ID!) {
        getUserReviews(userId: $userId) {
            isAdded
            reviews {
                rating
                text
                createdAt
                _id
                createdBy {
                    _id
                    userName
                    avatarURL
                }
                receivedBy
            }
        }
    }
`

export interface getReviewsResponse {
    getUserReviews: ReviewDataType
}

export interface ReviewDataType {
    isAdded: boolean
    reviews: Array<Review>
}

export interface Review {
    rating: number
    text: string
    receivedBy: string
    createdBy: {
        _id: string
        userName: string
        avatarURL: string
    }
    createdAt: string
    _id: string
}