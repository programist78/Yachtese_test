'use client'
import React, { useLayoutEffect, useRef } from 'react'
import useMessagesStore, { Message } from '../stores/useMessagesStore'
import useAuthStore, { Populate } from '../stores/useAuthStore'

interface Props {
    messagesList: Array<Message>
    chatId: string
    newChatUserData?: Populate
    offers?: Array<{
        _id: string
        accepted: boolean
        chatId: string
        createdFor: string
        createdBy: string
        createdAt: string
        description: string
        services: string[]
        title: string
        fileUrl: string[]
    }>
}

const MessagesStoreInitializer: React.FC<Props> = ({
    messagesList,
    chatId,
    newChatUserData,
    offers
}) => {
    const initialized = useRef(false)
    const userID = useAuthStore((state) => state.userData._id)
    const chats = useAuthStore((state) => state.userData.chats)
    const favoriteChats = useAuthStore((state) => state.userData.favoriteChats)
    const user = () => {

        if (chatId.includes('new')) return newChatUserData

        const chat = chats.filter((item) => item._id === chatId)[0]

        if (!chat) {
            const favChat = favoriteChats.filter((item) => item._id === chatId)[0]

            return favChat.user_1._id === userID
                ? favChat.user_2
                : favChat.user_1
        }

        return chat.user_1._id === userID ? chat.user_2 : chat.user_1
    }

    if (!initialized.current) {
        useMessagesStore.setState({ messagesList, selectedUser: user(), selectedChatId: chatId, offerData: offers })
        initialized.current = true
    }

    return null
}

export default MessagesStoreInitializer
