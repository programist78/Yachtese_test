'use client'
import React, { useRef } from 'react'
import useYachtPageStore, { YachtDataType } from '../stores/useYachtPageStore'

const YachtStoreInializer: React.FC<{ yachtData: YachtDataType }> = ({ yachtData }) => {

    const initialized = useRef(false)

    if (!initialized.current) {
        useYachtPageStore.setState({ yachtData })
        initialized.current = true
    }

    return null
}

export default YachtStoreInializer
