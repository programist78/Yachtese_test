'use client'
import React, { useRef } from 'react'
import useAuthStore, { userDataType } from '../stores/useAuthStore'

const StoreInitializer: React.FC<{ isLogined: boolean, userData: userDataType }> = ({ isLogined, userData }) => {

    const initialized = useRef(false)

    if (!initialized.current) {
        useAuthStore.setState({ isLogined, userData })
        initialized.current = true
    }

    return null
}

export default StoreInitializer
