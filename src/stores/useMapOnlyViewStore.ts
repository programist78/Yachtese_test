import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


export interface useMapOnlyViewStoreType {
    isOpened: boolean
    setIsOpened: (val: boolean) => void
}

const useMapOnlyViewStore = create<useMapOnlyViewStoreType>()(devtools((set) => ({
    isOpened: false,
    setIsOpened: (val) => set({ isOpened: val }),
}), { name: 'useMapOnlyViewStore' }))

export default useMapOnlyViewStore