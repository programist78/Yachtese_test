import { gql } from '@apollo/client'

export const GET_ALL_SUPPLIERS = gql`
  query Query($getSuppliersByRoleInput: GetSuppliersByRoleInput) {
  getSuppliersByRole(getSuppliersByRoleInput: $getSuppliersByRoleInput) {
    count
    suppliers {
      _id
      createdAt
      resetPassword {
        token
        expire
        changed
      }
      role
      userName
      email
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
      services
      avatarURL
      description
      imagesURL
      contactInfo {
        name
        link
      }
      chats
      favoriteChats
      displayFields
    }
  }
}

`

export interface getAllSuppliercsResponse {
  getSuppliersByRole: {
    count: number
    suppliers: Array<{
      _id: string
      createdAt: string
      role
      userName
      email
      location: {
        lat: string
        lon: string
        radius: string
      }
      services: Array<string>
      avatarURL: string
      description: string
      contactInfo: {
        name: string
        link: string
      }
    }>
  }
}

export interface getAllSuppliersInput {
  getSuppliersByRoleInput: {
    page: number
    country?: string
    service?: string[]
  }
} 