import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface useFavoriteSuppliersPopupStoreType {
    isOpened: boolean
    setIsOpened: (val:boolean) => void
}

const useFavoriteSuppliersPopupStore = create<useFavoriteSuppliersPopupStoreType>()(devtools((set) => ({
    isOpened: false,
    setIsOpened: (val) => set({isOpened:val})
}), {name: 'useFavoriteSuppliersPopupStore'}))

export default useFavoriteSuppliersPopupStore