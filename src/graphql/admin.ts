import { gql } from '@apollo/client'

export const GETUSERS_BYROLE = gql`
   query GetUsersByRole($role: RoleTypes!) {
  getUsersByRole(role: $role) {
    _id
    createdAt
    userName
    email
    avatarURL
    companyName
    requestedYachtCompany
    connectedYachtCompany
    connectedYacht
    teamMates
    services
    description
    imagesURL
    yachts
    departments
    role
    chats
    favoriteChats
    country
    resetPassword {
      token
      expire
      changed
    }
    subscription {
      subscriptionId
      customerId
      startDate
      endDate
      status
    }
    location {
      lat
      lon
      radius
    }
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
  }
}
`

export const SEND_EMAIL_INVITES = gql`
mutation Mutation($subject: String!) {
  sendEmailInvites(subject: $subject) {
    status
    message
  }
}
`