'use client'
import React, { useRef } from 'react'
import { ReviewDataType } from '../graphql/getReviews'
import useReviewsStore from '../stores/useReviewsStore'

const ReviewsStoreInitializer: React.FC<{ data: ReviewDataType }> = ({ data }) => {

    const initialized = useRef(false)

    if (!initialized.current) {
        useReviewsStore.setState(data)
        initialized.current = true
    }

    return null
}

export default ReviewsStoreInitializer
