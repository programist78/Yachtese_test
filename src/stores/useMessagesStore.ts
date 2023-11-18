import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Populate } from './useAuthStore'


export interface MessageType {
  offerId: OfferType | null
  readStatus: boolean
  images: string[]
  message: string
  user: {
    userName: string
    avatarURL: string
    _id: string
  }
  createdAt: string
}

export interface OfferType {
  fileUrl: string
  accepted: boolean
  services: string
  description: string
  title: string
  createdFor: string
  _id: string
}

export interface useMessagesStoreType {
  messagesList: Array<MessageType>
  selectedUser: Populate
  selectedChatId: string
  setSelectedUser: (user: Populate) => void
  setSelectedChatId: (id: string) => void
  addMessage: (message: MessageType) => void
  removeLastMessage: () => void
  acceptOffer: (id: string) => void
}

const useMessagesStore = create<useMessagesStoreType>()(devtools((set) => ({
  messagesList: [],
  selectedUser: null,
  selectedChatId: null,
  setSelectedUser: (user) => {
    set({ selectedUser: user })
  },
  setSelectedChatId: (id) => set({ selectedChatId: id }),
  addMessage: (message) => set((state) => ({ messagesList: [...state.messagesList, message] })),
  removeLastMessage: () => set((state) => ({ messagesList: state.messagesList.slice(0, -1) })),
  acceptOffer: (id) => set((state) => {
    return { messagesList: state.messagesList.map((item) => item.offerId ? item.offerId._id === id ? { ...item, offerId: { ...item.offerId, accepted: true } } : item : item)}
  })
}), { name: 'useMessagesStore' }))

export default useMessagesStore