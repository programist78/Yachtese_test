import { gql } from '@apollo/client'

export const DELETE_SUPPLIER_SERVICE = gql`
    mutation Mutation($deleteSupplierServiceInput: DeleteSupplierServiceInput) {
        deleteSupplierService(deleteSupplierServiceInput: $deleteSupplierServiceInput) {
            services
        }
    }
`

export interface deleteSupplierServiceResponse {
    deleteSupplierService: {
        services: Array<string>
    }
}

export interface deleteSupplierServiceInput {
    deleteSupplierServiceInput: {
        services: string
    }
}