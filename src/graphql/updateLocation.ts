import { gql } from '@apollo/client'

export const UPDATE_LOCATION = gql`
    mutation Mutation($changeLocationInput: ChangeLocationInput) {
        changeLocation(changeLocationInput: $changeLocationInput) {
            location {
                radius
                lon
                lat
            }
            country
        }
    }
`

export interface updateLocationResponse {
    changeLocation: {
        location: {
          radius: string,
          lon: string,
          lat: string
        }
        country: string[]
      }
}

export interface updateLocationInput {
    changeLocationInput: {
        location: {
          radius: number,
          lon: number,
          lat: number
        }
        country: string[]
      }
}