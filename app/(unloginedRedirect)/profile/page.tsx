'use client'
import { FC } from 'react'
import c from './Profile.module.scss'
import classNames from 'classnames'
import useAuthStore from '../../../src/stores/useAuthStore'
import { useRouter } from 'next/navigation'
import { RootURLsEnum } from '../../../src/config/constants'
import { SupplierInputs, YachtBussinesInputs, YachtInputs, YachtTeammateInputs } from '../../../src/components/(ProfilePage)/Inputs'
import { SupplierInfo, YachtBussinesInfo, YachtInfo, YachtTeammateInfo } from '../../../src/components/(ProfilePage)/Info'
import DisplayFields, { DisplayFieldsButton } from '../../../src/components/DisplayFields/DisplayFields'
import UserInfo from '../../../src/components/(ProfilePage)/UserInfo'
import { SupplierAdditional, YachtAdditional, YachtBussinesAdditional, YachtTeammateAdditional } from '../../../src/components/(ProfilePage)/Additional'
import TeamMatesPopup from '../../../src/components/TeamMatesPopup/TeamMatesPopup'
import MapPopup from '../../../src/components/MapPopup/MapPopup'
import YachtRequest from '../../../src/components/YachtRequest/YachtRequest'
import Admin from '../../../src/components/Admin/Admin'
import { MapViewBussines } from '../../../src/components/(ProfilePage)/MapView'
import { MapOnlyViewBussinesPopup } from '../../../src/components/MapPopup/MapOnlyViewPopup'


const page: FC = () => {

    const userData = useAuthStore((state) => state.userData)
    const router = useRouter()

    switch (userData.role) {
        case 'SUPPLIER': {
            return <main className={classNames(c.main, 'container')}>
                <div className={c.left}>
                    <UserInfo />
                    <SupplierInfo />
                    <DisplayFieldsButton />
                </div>
                <div className={c.right}>
                    <SupplierInputs />
                    <SupplierAdditional />
                </div>
                <DisplayFields />
            </main>
        }
        case 'YACHT': {
            return <main className={classNames(c.main, 'container')}>
                <div className={c.left}>
                    <UserInfo />
                    <YachtRequest/>
                    <YachtInfo />
                    <DisplayFieldsButton />
                </div>
                <div className={c.right}>
                    <YachtInputs />
                    <YachtAdditional />
                </div>
                <DisplayFields />
                <TeamMatesPopup />
                <MapPopup />
            </main>
        }
        case 'YACHT_TEAMMATE': {
            return <main className={classNames(c.main, 'container')}>
                <div className={c.left}>
                    <UserInfo />
                    <YachtTeammateInfo />
                    <DisplayFieldsButton />
                </div>
                <div className={c.right}>
                    <YachtTeammateInputs />
                    <YachtTeammateAdditional />
                </div>
                <MapPopup />
            </main>
        }
        case 'YACHT_BUSINESS': {
            return <main className={classNames(c.main, 'container')}>
                <div className={c.left}>
                    <UserInfo />
                    <YachtBussinesInfo />
                    <DisplayFieldsButton />
                </div>
                <div className={c.right}>
                    <YachtBussinesInputs />
                    <MapViewBussines />
                    <YachtBussinesAdditional />
                </div>
                <DisplayFields />
                <MapOnlyViewBussinesPopup />
            </main>
        }
        case 'ADMIN': {
            return <Admin/>
        }
        default: {
            router.push(RootURLsEnum.homepage)

            return null
        }
    }
}

export default page