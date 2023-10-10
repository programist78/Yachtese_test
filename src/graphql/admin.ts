import { gql } from '@apollo/client'

export const GETUSERS_BYROLE = gql`
   query GetUsersByRole($role: RoleTypes!, $pageNumber: Int) {
  getUsersByRole(role: $role, pageNumber: $pageNumber) {
    users {
      _id
      createdAt
      userName
      email
      contactInfo {
        link
        name
      }
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

export const BAN_USER = gql`
  mutation BanUser($email: String!) {
    banUser(email: $email) {
      _id
    }
  }
`

export const UNBAN_USER = gql`
  mutation BanUser($email: String!) {
    unBanUser(email: $email) {
      _id
    }
  }
`