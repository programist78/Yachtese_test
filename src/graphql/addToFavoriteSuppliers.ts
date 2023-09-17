import { gql } from '@apollo/client'

export const ADD_FAVORIVE_SUPPLIER = gql`
    mutation AddFavoriteSupplier(
        $addFavoriteSupplierInput: AddFavoriteSupplierInput
    ) {
        addFavoriteSupplier(
            addFavoriteSupplierInput: $addFavoriteSupplierInput
        ) {
            favoriteSuppliers
        }
    }
`

export interface addFavoriteSupplierResponse {
    addFavoriteSupplier: {
        favoriteSuppliers: Array<string>
    }
}

export interface addFavoriteSupplierInput {
    addFavoriteSupplierInput: {
        favoriteSuppliers: string
      }
}