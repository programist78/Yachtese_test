import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UserRolesType } from '../config/constants'
import { ChatWithoutLasMessage } from '../graphql/lastMessageSubscription'
import { MessageType } from './useMessagesStore'

export interface Populate {
    createdAt: string
    avatarURL: string
    _id: string
    userName: string
    role: UserRolesType
}

export interface Chat {
    _id: string
    lastMessage: {
        created: string
        message: string
        user: string
    }
    user_1: Populate
    user_2: Populate
    readStatus: boolean
}

export interface MarkerType {
    lon: number
    lat: number
    title: string
    status: boolean
    time: string
}

export interface userDataType {
    _id?: string
    avatarURL?: string
    country?: string[]
    chats: Array<Chat>
    companyName?: string
    connectedYachtCompany?: string
    createdAt: string
    departments: Array<any>
    description?: string | null
    displayFields: Array<string>
    email: string
    favoriteChats: Array<Chat>
    favoriteSuppliers: Array<{
        name: string
        id: Array<Populate>
    }>
    imagesURL: Array<string>
    location?: {
        radius: string | null
        lon: string | null
        lat: string | null
    }
    contactInfo: Array<{
        link: string
        name: string
    }>
    requestedYachtCompany: Array<{
        avatarURL:string
        userName:string
        _id:string
    }>
    resetPassword: {
        token: string
        expire: string
        changed: string
    }
    role: UserRolesType
    services: Array<string>
    subscription: {
        status: string
        endDate: string
        startDate: string
        customerId: string
        subscriptionId: string
      }
    teamMates: Array<{
        avatarURL: string
        _id: string
        userName: string
    }>
    userName: string
    yachtRoute: Array<MarkerType>
    yachts: Array<Populate>
    allYachtRoutes: Array<{
        email: string
        yachtRoutes: Array<MarkerType>
    }>
}

export interface useAuthStoreType {
    isLogined: boolean
    userData: null | userDataType
    setUserData: (data: null | userDataType) => void
    readChat: (chatId: string) => void
    messageToUnselectedChat: (chat: ChatWithoutLasMessage, message: MessageType) => void
    messageToSelectedChat: (chat: ChatWithoutLasMessage, message: MessageType) => void
}

const useAuthStore = create<useAuthStoreType>()(devtools((set) => ({
    isLogined: false,
    userData: null,
    setUserData: (data) => {
        if (!data) {
            set({ isLogined: false, userData: null })

            return
        }
        set({ isLogined: true, userData: data })
    },
    readChat: (chatId) => set((state) => {
        const chat = state.userData.chats.find((c) => c._id === chatId)
        const favChat = state.userData.favoriteChats.find((c) => c._id === chatId)

        if(chat) return { userData: { ...state.userData, chats: state.userData.chats.map((item) => item._id === chatId ? { ...item, readStatus: true } : item) } }
        if(favChat) return { userData: { ...state.userData, favoriteChats: state.userData.favoriteChats.map((item) => item._id === chatId ? { ...item, readStatus: true } : item) } }

        return {}
    }),
    messageToUnselectedChat: (chat, message) => set((state) => {
        const existChat = state.userData.chats.find((c) => c._id === chat._id)
        const existFavChat = state.userData.favoriteChats.find((c) => c._id === chat._id)
        
        if(existChat) return {
            userData: {
                ...state.userData,
                chats: [ ...state.userData.chats.map((item) => item._id === chat._id ? { ...item, readStatus: false, lastMessage: { ...item.lastMessage, message: message.message, created: message.createdAt } } : item) ]
            }
        }

        if(existFavChat) return {
            userData: {
                ...state.userData,
                favoriteChats: [ ...state.userData.favoriteChats.map((item) => item._id === chat._id ? { ...item, readStatus: false, lastMessage: { ...item.lastMessage, message: message.message, created: message.createdAt } } : item) ]
            }
        }

        return { userData: { ...state.userData, chats: [ ...state.userData.chats, { ...chat, lastMessage: { created: new Date().toString(), message: message.message, user: 'not-you' } } ] } }
    }),
    messageToSelectedChat: (chat, message) => set((state) => {
        return {
            userData: {
                ...state.userData,
                chats: [ ...state.userData.chats.map((item) => item._id === chat._id ? { ...item, readStatus: true, lastMessage: { ...item.lastMessage, message: message.message, created: message.createdAt } } : item) ]
            }
        }
    })
}), { name: 'useAuthStore' }))

export default useAuthStore