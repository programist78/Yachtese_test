import { gql } from '@apollo/client'

export const UPDATE_DISPLAY_FIELDS = gql`
    mutation UpdateDisplayFields($updateDisplayFieldsInput: UpdateDisplayFieldsInput) {
        updateDisplayFields(updateDisplayFieldsInput: $updateDisplayFieldsInput) {
            displayFields
        }
    }
`

export interface updateDisaplyFieldsResponse {
    updateDisplayFields: {
        displayFields: Array<string>
    }
}

export interface updateDisaplyFieldsInput {
    updateDisplayFieldsInput: {
        displayFields: Array<string>
    }
}