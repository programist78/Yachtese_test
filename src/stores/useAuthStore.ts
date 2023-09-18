import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UserRolesType } from '../config/constants'

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
    notification?: boolean
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
    requestedYachtCompany: Array<any>
    resetPassword: {
        token: string
        expire: string
        changed: string
    }
    role: UserRolesType
    services: Array<string>
    subscription: {
        subscriptionId: string | null
        status: string | null
        startDate: string | null
        endDate: string | null
        customerId: string | null
    }
    teamMates: Array<{
        avatarURL: string
        _id: string
        userName: string
    }>
    userName: string
    yachtRoute: Array<MarkerType>
    yachts: Array<Populate>
}

export interface useAuthStoreType {
    isLogined: boolean
    userData: null | userDataType
    setUserData: (data: null | userDataType) => void
    readAll: (chatId:string) => void
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
    readAll: (chatId) => set((state) => ({
        userData: { ...state.userData, chats: state.userData.chats.map((item) => item._id === chatId ? ({ ...item, notification: false }) : item)}
    }))
}), { name: 'useAuthStore' }))

export default useAuthStore