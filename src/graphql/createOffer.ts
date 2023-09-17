import { gql } from '@apollo/client'

export const CREATE_OFFER = gql`
    mutation SendOffer($sendOfferInput: SendOfferInput) {
        sendOffer(sendOfferInput: $sendOfferInput) {
            _id
            accepted
            chatId
            createdAt
            createdBy
            createdFor
            description
            services
            title
        }
    }
`

export interface sendOfferInput {
    sendOfferInput: {
        title: string
        services: string
        description: string
        accepted: boolean
        chatId: string
        createdFor: string
    }
}

export interface sendOfferResponse {
    _id: string
    accepted: string
    chatId: string
    createdAt: string
    createdBy: string
    createdFor: string
    description: string
    services: string
    title: string
}
