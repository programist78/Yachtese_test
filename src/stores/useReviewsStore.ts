import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Review } from '../graphql/getReviews'

interface stateType {
    reviews: Array<Review>
    isAdded: boolean
    reviewAdded: (review: Review) => void
}

const useReviewsStore = create<stateType>()(devtools((set) => ({
    isAdded: false,
    reviews: [],
    reviewAdded: (review) => set((state) => ({ isAdded: true, reviews: [...state.reviews, review] }))
}), { name: 'useReviewsStore' }))


export default useReviewsStore