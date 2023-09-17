import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface useDisplayFieldsStoreType {
    isOpened: boolean
    setIsOpened: (val:boolean) => void
}

const useDisplayFieldsStore = create<useDisplayFieldsStoreType>()(devtools((set) => ({
    isOpened: false,
    setIsOpened: (val) => set({isOpened:val})
}), {name: 'useDisplayFieldsStore'}))

export default useDisplayFieldsStore