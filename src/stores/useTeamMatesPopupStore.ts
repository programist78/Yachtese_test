import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface useTeamMatesPopupStoreType {
    isOpened: boolean
    setIsOpened: (val:boolean) => void
}

const useTeamMatesPopupStore = create<useTeamMatesPopupStoreType>()(devtools((set) => ({
    isOpened: false,
    setIsOpened: (val) => set({isOpened:val})
}), {name: 'useTeamMatesPopupStore'}))

export default useTeamMatesPopupStore