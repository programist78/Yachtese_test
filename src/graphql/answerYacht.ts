import { gql } from '@apollo/client'

export const ANSWER_YACHT = gql`
    mutation AnswerYachtRequest($answerYachtRequestInput: AnswerYachtRequestInput) {
        answerYachtRequest(answerYachtRequestInput: $answerYachtRequestInput) {
            _id
        }
    }
`