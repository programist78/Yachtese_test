import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


export interface useMapStoreType {
    isOpened: boolean
    setIsOpened: (val: boolean) => void
}

const useMapStore = create<useMapStoreType>()(devtools((set) => ({
    isOpened: false,
    setIsOpened: (val) => set({ isOpened: val }),
}), { name: 'useMapStore' }))

export default useMapStore