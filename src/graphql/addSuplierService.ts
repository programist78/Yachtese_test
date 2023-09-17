import { gql } from '@apollo/client'

export const ADD_SUPLIER_SERVICE = gql`
    mutation Mutation($addSupplierServiceInput: AddSupplierServiceInput) {
        addSupplierService(addSupplierServiceInput: $addSupplierServiceInput) {
            services
        }
    }
`

export interface addSupplierServiceInput {
    addSupplierServiceInput: {
        services: Array<string>
    }
}

export interface addSupplierServiceResponse {
    addSupplierService: {
        services: Array<string>
    }
}