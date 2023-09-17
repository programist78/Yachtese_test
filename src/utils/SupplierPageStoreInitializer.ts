'use client'
import React, { useRef } from 'react'
import useSupplierPageStore, { SupplierDataType } from '../stores/useSupplierPageStore'

const SupplierPageStoreInitializer: React.FC<{ supplierData: SupplierDataType }> = ({ supplierData }) => {

    const initialized = useRef(false)

    if (!initialized.current) {
        useSupplierPageStore.setState({ supplierData })
        initialized.current = true
    }

    return null
}

export default SupplierPageStoreInitializer
