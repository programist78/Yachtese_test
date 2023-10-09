import { gql } from '@apollo/client'

export const GETUSERS_BYROLE = gql`
   query GetUsersByRole($role: RoleTypes!, $pageNumber: Int) {
  getUsersByRole(role: $role, pageNumber: $pageNumber) {
    users {
      _id
      createdAt
      userName
      email
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