'use client'
import React, { useRef } from 'react'
import useSupplierSearchStore, { supplierListType } from '../stores/useSupplierSearchStore'

const SupplierSearchStoreInitializer: React.FC<{ supplierList:supplierListType }> = ({ supplierList }) => {

    const initialized = useRef(false)

    if (!initialized.current) {
        useSupplierSearchStore.setState({supplierList})
        initialized.current = true
    }

    return null
}

export default SupplierSearchStoreInitializer
