import { gql } from '@apollo/client'

export const GET_USER_BY_TOKEN = gql`
    query Query {
  getUserByToken {
    _id
    createdAt
    userName
    email
    avatarURL
    companyName
    subscription {
        status
        endDate
        startDate
        customerId
        subscriptionId
      }
    requestedYachtCompany {
      _id
      userName
      avatarURL
    }
    connectedYachtCompany {
      _id
      userName
      avatarURL
    }
    connectedYacht {
      _id
      userName
      avatarURL
    }
    yachts {
      _id
      userName
      avatarURL
    }
    teamMates {
      avatarURL
      userName
      _id
    }
    location {
      radius
      lon
      lat
    }
    services
    description
    imagesURL
    contactInfo {
      link
      name
    }
    favoriteSuppliers {
      name
      id {
        avatarURL
        userName
        _id
      }
    }
    yachtRoute {
      status
      time
      title
      lon
      lat
    }
    departments
    role
    chats {
      lastMessage {
        created
        message
        user
      }
      user_2 {
        avatarURL
        userName
        _id
      }
      user_1 {
        avatarURL
        userName
        _id
      }
      _id
      readStatus
    }
    favoriteChats {
      lastMessage {
        created
        message
        user
      }
      user_2 {
        avatarURL
        userName
        _id
      }
      user_1 {
        avatarURL
        userName
        _id
      }
      _id
      readStatus
    }
    displayFields
    country
    allYachtRoutes {
      email
      yachtRoutes {
        lat
        lon
        title
        time
        status
      }
    }
  }
}
`
