import { gql } from '@apollo/client'
import { userDataType } from '../stores/useAuthStore'
import { UserRolesType } from '../config/constants'

export const REGISTER_USER_MUTATION = gql`
mutation RegisterUser($registerUserInput: RegisterUserInput) {
  registerUser(registerUserInput: $registerUserInput) {
    token
    message
    user {
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
      }
      requestedYachtCompany
      connectedYachtCompany
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
    }
  }
}
`

export interface registerUserMutationResponse {
    registerUser: {
        message: string
        token: string
        user: userDataType
    }
}

export interface registerUserMutationInput {
    registerUserInput: {
        role: UserRolesType
        userName: string
        password: string
        email: string
        contactInfo?: {
            link: string
            name: string
        }
        companyName: string
    }
}
