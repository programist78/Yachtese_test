import { gql } from '@apollo/client'

export const GET_ALL_SUPPLIERS = gql`
  query Query($getSuppliersByRoleInput: GetSuppliersByRoleInput) {
  getSuppliersByRole(getSuppliersByRoleInput: $getSuppliersByRoleInput) {
    count
    mapSuppliers {
      location {
        lon
        lat
        radius
      }
      userName
      _id
    }
    suppliers {
      _id
      rating
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
        status
        endDate
        startDate
        customerId
        subscriptionId
      }
      companyName
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
      rating: number
      role
      userName
      email
      companyName
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
    mapSuppliers: Array<{
      location: {
        lon: string
        lat: string
        radius: string
      }
      userName: string
      _id: string
    }>
  }
}

export interface getAllSuppliersInput {
  getSuppliersByRoleInput: {
    page: number
    country?: string[]
    service?: string[]
    view?: 'NEW' | 'FAV' | 'OLD'
  }
} 