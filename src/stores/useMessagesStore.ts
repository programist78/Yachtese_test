import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UserRoles } from '../config/constants'
import { Populate } from './useAuthStore'


export interface Message {
    createdAt: string
    message: string
    user: Populate
}

export interface useMessagesStoreType {
    messagesList: Array<Message>
    selectedUser: Populate
    selectedChatId: string
    setSelectedUser: (user: Populate) => void
    setSelectedChatId: (id: string) => void
    addMessage: (message: Message) => void
    removeLastMessage: () => void
}

const useMessagesStore = create<useMessagesStoreType>()(devtools((set) => ({
    messagesList: [],
    selectedUser: null,
    selectedChatId: null,
    setSelectedUser: (user) => {
        set({ selectedUser: user })
    },
    setSelectedChatId: (id) => set({selectedChatId:id}),
    addMessage: (message) => set((state) => ({ messagesList: [...state.messagesList, message] })),
    removeLastMessage: () => set((state) => ({ messagesList: state.messagesList.slice(0, -1) }))
}), { name: 'useMessagesStore' }))

export default useMessagesStore