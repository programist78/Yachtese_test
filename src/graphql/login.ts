import { gql } from '@apollo/client'
import { UserRolesType } from '../config/constants'
import { userDataType } from '../stores/useAuthStore'

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      chats {
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
      requestedYachtCompany {
        avatarURL
        _id
        companyName
        userName
      }
      connectedYachtCompany {
        _id
        userName
        avatarURL
      }
      connectedYacht {
        _id
        avatarURL
        userName
      }
      teamMates {
        _id
        userName
        avatarURL
      }
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
        id {
          _id
          userName
          avatarURL
        }
        name
      }
      
      yachtRoute {
        lat
        lon
        title
        time
        status
      }
      yachts {
        _id
        userName
        avatarURL
      }
      departments
      role
      favoriteChats {
        _id
        user_1 {
          _id
          userName
          avatarURL
        }
        user_2 {
          _id
          userName
          avatarURL
        }
        lastMessage {
          user
          message
          created
        }
      }
      displayFields
    }
    token
    message
  }
}
`

export interface LoginResponse {
    login: {
        token: string
        message: string
        user: userDataType
    }
}

export interface LoginInput {
    email: string
    password: string
}
