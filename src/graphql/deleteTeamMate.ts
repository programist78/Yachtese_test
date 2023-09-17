import { gql } from '@apollo/client'

export const DELETE_TEAM_MATE = gql`
    mutation Mutation($deleteTeamMateInput: DeleteTeamMateInput) {
        deleteTeamMate(deleteTeamMateInput: $deleteTeamMateInput) {
            teamMates
        }
    }
`

export interface deleteTeamMateResponse {
    deleteTeamMate: {
        teamMates: Array<string>
    }
}

export interface deleteTeamMateInput {
    deleteTeamMateInput: {
        teamMates: string
    }
}