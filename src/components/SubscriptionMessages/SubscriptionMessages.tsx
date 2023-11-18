'use client'
import { useSubscription } from '@apollo/client'
import React from 'react'
import { LAST_MESSAGE, lastMessageResponse } from '../../graphql/lastMessageSubscription'
import useAuthStore from '../../stores/useAuthStore'
import useMessagesStore from '../../stores/useMessagesStore'
import { useParams } from 'next/navigation'


const SubscriptionMessages: React.FC = () => {

    const addMessage = useMessagesStore((state) => state.addMessage)
    const messageToUnselectedChat = useAuthStore((state) => state.messageToUnselectedChat)
    const messageToSelectedChat = useAuthStore((state) => state.messageToSelectedChat)
    const { id } = useParams()

    useSubscription<lastMessageResponse>(LAST_MESSAGE, {
            onData: ({ data }) => {
                if (id === data.data.lastMessage.chat._id) {
                    addMessage(data.data.lastMessage.message)
                    return messageToSelectedChat(data.data.lastMessage.chat, data.data.lastMessage.message)
                }

                messageToUnselectedChat(data.data.lastMessage.chat, data.data.lastMessage.message)
            }
        })

    return null
}

export default SubscriptionMessages
