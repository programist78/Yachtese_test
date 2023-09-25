import { gql } from '@apollo/client'

export const ADD_FAVORIVE_SUPPLIER = gql`
    mutation AnswerOffer($addFavoriteSuppliersGroupInput: FavoriteSuppliersInput) {
  addFavoriteSuppliersGroup(addFavoriteSuppliersGroupInput: $addFavoriteSuppliersGroupInput) {
    favoriteSuppliers {
      name
      id
    }
  }
}
`

export const RESTORE_FAV_SUPPLIER = gql`
  mutation RestoreFavoriteSuppliers($restoreFavoriteSuppliersInput: RestoreFavoriteSuppliersInput) {
    restoreFavoriteSuppliers(restoreFavoriteSuppliersInput: $restoreFavoriteSuppliersInput) {
      favoriteSuppliers {
        name
        id
      }
    }
  }
`

export interface addFavoriteSupplierResponse {
    addFavoriteSuppliersGroupInput: {
        favoriteSuppliers: Array<{
            name: string
            id: string | string[]
        }>
    }
}

export interface restoreFavoriteSupplierResponse {
  restoreFavoriteSuppliers: {
      favoriteSuppliers: Array<{
          name: string
          id: string[]
      }>
  }
}

export interface addFavoriteSupplierInput {
    addFavoriteSuppliersGroupInput: {
        name: string
        id: string
    }
}

export interface restoreFavoriteSupplierInput {
  restoreFavoriteSuppliersInput: {
    favoriteSuppliers: Array<{
      name: string,
      id: string[]
    }>
  }
}