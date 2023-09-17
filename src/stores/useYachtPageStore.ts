import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { MarkerType } from './useAuthStore'


export interface YachtDataType {
    yachtRoute: Array<MarkerType>
    userName: string
    teamMates: string[] // refactor
    _id: string
    avatarURL: string
    companyName: string
    connectedYachtCompany: string
    email: string
    contactInfo: Array<{
        name: string
        link: string
    }>
    departments: Array<string>
}

export interface useYachtPageStoreType {
    yachtData: YachtDataType
}

const useYachtPageStore = create<useYachtPageStoreType>()(devtools((set) => ({
    yachtData: null
}), { name: 'useYachtPageStore' }))

export default useYachtPageStore