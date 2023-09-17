'use client'
import React, { useRef } from 'react'
import useMessagesStore, { Message } from '../stores/useMessagesStore'
import useAuthStore, { Populate } from '../stores/useAuthStore'

interface Props {
    messagesList: Array<Message>
    chatId: string
    newChatUserData?: Populate
}

const MessagesStoreInitializer: React.FC<Props> = ({
    messagesList,
    chatId,
    newChatUserData,
}) => {
    const initialized = useRef(false)
    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const user = () => {

        if(chatId.includes('new')) return newChatUserData

        const chat = userData.chats.filter((item) => item._id === chatId)[0]

        if (!chat) {
            const favChat = userData.favoriteChats.filter((item) => item._id === chatId)[0]

            return favChat.user_1._id === userData._id
                ? favChat.user_2
                : favChat.user_1
        }

        return chat.user_1._id === userData._id ? chat.user_2 : chat.user_1
    }

    if (!initialized.current) {
        useMessagesStore.setState({ messagesList, selectedUser: user(), selectedChatId: chatId })
        setUserData({...userData, chats: userData.chats.map((item) => item._id === chatId ? ({...item, notification:false }) : item)})
        initialized.current = true
    }

    return null
}

export default MessagesStoreInitializer
