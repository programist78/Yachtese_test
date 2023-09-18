import { gql } from '@apollo/client'

export const RESTORE_FAVORIVE_SUPPLIER = gql`
    mutation AnswerOffer($addFavoriteSuppliersGroupInput: AddFavoriteSuppliersGroupInput) {
        addFavoriteSuppliersGroup(addFavoriteSuppliersGroupInput: $addFavoriteSuppliersGroupInput) {
            favoriteSuppliers {
                name
                id
            }
        }
    }
`

export interface restoreFavoriteSupplierResponse {
    addFavoriteSuppliersGroupInput: {
        favoriteSuppliers: Array<{
            name: string
            id: string | string[]
        }>
    }
}

export interface restoreFavoriteSupplierInput {
    restoreFavoriteSuppliers: {
        favoriteSuppliers: Array<{
            name: string
            id: string[]
        }>
    }
}