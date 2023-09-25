import { gql } from '@apollo/client'

export const GET_USER_BY_TOKEN = gql`
    query GetUserByToken {
        getUserByToken {
            country
            yachts {
                userName
                avatarURL
                _id
            }
            yachtRoute {
                title
                time
                status
                lon
                lat
            }
            userName
            teamMates {
                userName
                avatarURL
                _id
            }
            _id
            createdAt
            email
            avatarURL
            companyName
            requestedYachtCompany
            connectedYachtCompany
            services
            description
            imagesURL
            departments
            role
            displayFields
            resetPassword {
                token
                expire
                changed
            }
            subscription {
                subscriptionId
                customerId
                startDate
                endDate
                status
            }
            location {
                lat
                lon
                radius
            }
            contactInfo {
                name
                link
            }
            favoriteSuppliers {
                id {
                    _id
                    userName
                    avatarURL
                }
                name
            }
            chats {
                _id
                user_1 {
                    _id
                    userName
                    avatarURL
                }
                user_2 {
                    _id
                    userName
                    avatarURL
                }
                lastMessage {
                    user
                    message
                    created
                }
            }
            favoriteChats {
                user_2 {
                    userName
                    avatarURL
                    _id
                }
                user_1 {
                    userName
                    avatarURL
                    _id
                }
                lastMessage {
                    user
                    message
                    created
                }
                _id
            }
        }
    }
`
