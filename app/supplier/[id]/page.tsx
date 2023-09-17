'use client'
import { FC } from 'react'
import c from './Supplier.module.scss'
import { SupplierUserInfo } from '../../../src/components/(ProfilePage)/UserInfo'
import { SupplierViewInfo } from '../../../src/components/(ProfilePage)/Info'
import { SupplierViewInputs } from '../../../src/components/(ProfilePage)/Inputs'
import useSupplierPageStore from '../../../src/stores/useSupplierPageStore'

const page: FC = () => {

    const services = useSupplierPageStore((state) => state.supplierData.services)

    return (
        <div className={`${c.main} container`}>
            <div className={c.left}>
                <SupplierUserInfo />
                {services && services.length > 0 && <SupplierViewInfo />}
            </div>
            <div className={c.right}>
                <SupplierViewInputs />
            </div>
        </div>
    )
}

export default page
