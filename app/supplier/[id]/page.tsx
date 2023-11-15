'use client'
import { FC } from 'react'
import c from './Supplier.module.scss'
import { SupplierUserInfo } from '../../../src/components/(ProfilePage)/UserInfo'
import { SupplierViewInfo } from '../../../src/components/(ProfilePage)/Info'
import { SupplierViewInputs } from '../../../src/components/(ProfilePage)/Inputs'
import { SupplierViewAdditional } from '../../../src/components/(ProfilePage)/Additional'

const page: FC = () => {
    return (
        <div className={`${c.main} container`}>
            <div className={c.left}>
                <SupplierUserInfo />
                <SupplierViewInfo />
            </div>
            <div className={c.right}>
                <SupplierViewInputs />
                <SupplierViewAdditional />
            </div>
        </div>
    )
}

export default page
