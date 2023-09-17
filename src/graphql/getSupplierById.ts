import { gql } from '@apollo/client'
import { SupplierDataType } from '../stores/useSupplierPageStore'

export const GET_SUPPLIER_BY_ID = gql`
    query GetSupplierById($id: String!) {
        getSupplierById(_id: $id) {
            _id
            description
            email
            imagesURL
            avatarURL
            userName
            contactInfo {
                name
                link
            }
            services
            location {
                radius
                lon
                lat
            }
        }
    }
`

export interface getSupplierByIdResponse {
    getSupplierById: SupplierDataType
}

export interface getSupplierByIdInput {
    id: string
}
