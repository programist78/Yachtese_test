import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface useOfferPopupStoreType {
    isOpened: boolean
    setIsOpened: (val:boolean) => void
}

const useOfferPopupStore = create<useOfferPopupStoreType>()(devtools((set) => ({
    isOpened: false,
    setIsOpened: (val) => set({isOpened:val})
}), {name: 'useOfferPopupStore'}))

export default useOfferPopupStore