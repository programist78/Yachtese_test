import { gql } from '@apollo/client'

export const CANCEL_SUB = gql`
mutation Mutation {
    cancelSubscription {
      _id
      createdAt
      userName
      email
      resetPassword {
        token
        expire
        changed
      }
      avatarURL
      companyName
      subscription {
        subscriptionId
        customerId
        startDate
        endDate
        status
        name
      }
      requestedYachtCompany
      connectedYachtCompany
      connectedYacht
      teamMates
      location {
        lat
        lon
        radius
      }
      services
      description
      imagesURL
      contactInfo {
        name
        link
      }
      favoriteSuppliers {
        id
        name
      }
      yachtRoute {
        lat
        lon
        title
        time
        status
      }
      yachts
      departments
      role
      chats
      favoriteChats
      displayFields
      country
      ban
    }
  }
`