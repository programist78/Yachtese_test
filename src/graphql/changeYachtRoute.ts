import { gql } from '@apollo/client'

export const CHANGE_YACHT_ROUTE = gql`
    mutation ChangeAllYachtRoutes($yachtRoutesInput: YachtRoutesInput) {
        changeAllYachtRoutes(yachtRoutesInput: $yachtRoutesInput) {
            yachtRoute {
                title
                time
                status
                lon
                lat
            }
        }
    }
`

export interface changeYachtRouteResponse {
    changeAllYachtRoutes: {
        yachtRoute: Array<{
            title: string
            time: string
            status: boolean
            lon: number
            lat: number
        }>
    }
}

export interface changeYachtRouteInput {
    yachtRoutesInput: {
        yachtRoute: Array<{
            title: string
            time: string
            status: boolean
            lon: number
            lat: number
        }>
    }
}