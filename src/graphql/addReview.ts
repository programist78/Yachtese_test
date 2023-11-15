import { gql } from "@apollo/client"

export const ADD_REVIEW = gql`
    mutation Mutation($addReviewInput: AddReviewInput) {
        addReview(addReviewInput: $addReviewInput) {
            rating
            text
            receivedBy
            createdBy
            createdAt
            _id
        }
    }
`

export interface addReviewResponse {
    addReview: {
        rating: number
        text: string
        receivedBy: string
        createdBy: string
        createdAt: string
        _id: string
    }
}

export interface addReviewInput {
    addReviewInput: {
        rating: number
        text: string
        receivedBy: string
    }
}