'use client'
import { useSubscription } from '@apollo/client'
import React from 'react'
import { LAST_MESSAGE, lastMessageResponse } from '../../graphql/lastMessageSubscription'
import useAuthStore from '../../stores/useAuthStore'
import useMessagesStore from '../../stores/useMessagesStore'


const SubscriptionMessages: React.FC = () => {

    const setUserData = useAuthStore((state) => state.setUserData)
    const userData = useAuthStore((state) => state.userData)
    const selectedChatId = useMessagesStore((state) => state.selectedChatId)
    const addMessage = useMessagesStore((state) => state.addMessage)
    const addOffer = useMessagesStore((state) => state.addOffer)

    useSubscription<lastMessageResponse>(LAST_MESSAGE,
        {
            onData: ({ data }) => {

                const { avatarURL, chatId, created, message, user, userName, isOffer, role } = data.data.lastMessage

                // if(isOffer && selectedChatId === chatId) {
                //     addOffer({
                //         _id: 
                //     })

                //     return
                // }

                if (selectedChatId === chatId) {
                    addMessage({
                        createdAt: created,
                        message,
                        user: {
                            createdAt: '',
                            _id: user,
                            avatarURL: avatarURL,
                            role: role,
                            userName
                        }
                    })

                    return
                }

                const chat = userData.chats.find((c) => c._id === chatId)

                if (chat) {
                    setUserData({
                        ...userData, chats: userData.chats.map((item) => item._id === chat._id
                            ? { ...chat, lastMessage: { created, message, user }, notification: selectedChatId !== chatId }
                            : item)
                    })
                } else {

                    setUserData({
                        ...userData,
                        chats: [
                            ...userData.chats,
                            {
                                _id: chatId, lastMessage: { created, message, user },
                                // eslint-disable-next-line
                                user_1: { _id: userData._id, avatarURL: userData.avatarURL, createdAt: userData.createdAt, role: userData.role, userName: userData.userName },
                                // eslint-disable-next-line
                                user_2: { createdAt: '', _id: user, avatarURL: avatarURL, role: 'SUPPLIER', userName }, // EDIT
                                notification: true
                            }
                        ]
                    })
                }

            }
        })

    return null
}

export default SubscriptionMessages
