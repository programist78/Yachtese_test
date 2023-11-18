import { MessageType } from './../stores/useMessagesStore';
import { gql } from '@apollo/client'

export const CREATE_OFFER = gql`
    mutation SendOffer($sendOfferInput: SendOfferInput) {
  sendOffer(sendOfferInput: $sendOfferInput) {
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
}
`

export interface sendOfferInput {
    sendOfferInput: {
        fileUrl: string
        title: string
        services: string
        description: string
        accepted: boolean
        chatId: string
        createdFor: string
    }
}

export interface sendOfferResponse {
    sendOffer: MessageType
}
