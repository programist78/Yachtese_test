import { gql } from '@apollo/client'

export const BUY_LINK = gql`
    mutation Mutation($paymentCheckoutInput: PaymentCheckoutInput) {
        paymentCheckout(paymentCheckoutInput: $paymentCheckoutInput) {
            url
            id
        }
    }
`