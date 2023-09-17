import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


export interface SupplierDataType {
    yachtRoute: Array<{
        lat: string
        lon: string
    }>
    location: {
      radius: string
      lon: string
      lat: string
    }
    userName: string
    teamMates: string[] // refactor
    _id: string
    description: string
    imagesURL: Array<string>
    avatarURL: string
    companyName: string
    connectedYachtCompany: string
    email: string
    contactInfo: Array<{
        name: string
        link: string
    }>
    departments: Array<string>
    services: Array<string>
}

export interface useYachtPageStoreType {
    supplierData: SupplierDataType
}

const useSupplierPageStore = create<useYachtPageStoreType>()(devtools((set) => ({
    supplierData: null
}), { name: 'useSupplierPageStore' }))

export default useSupplierPageStore