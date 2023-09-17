'use client'
import React from 'react'
import c from './Yacht.module.scss'
import { YachtInfo } from '../../../src/components/(ProfilePage)/UserInfo'
import { YachtPageInfo } from '../../../src/components/(ProfilePage)/Info'
import { YachtPageInputs } from '../../../src/components/(ProfilePage)/Inputs'
import MapView from '../../../src/components/(ProfilePage)/MapView'
import MapOnlyViewPopup from '../../../src/components/MapPopup/MapOnlyViewPopup'

const page: React.FC = () => {
    return (
        <main className={`${c.main} container`}>
            <div className={c.left}>
                <YachtInfo />
                <YachtPageInfo />
            </div>
            <div className={c.right}>
                <YachtPageInputs />
                <MapView/>
            </div>
            <MapOnlyViewPopup/>
        </main>
    )
}

export default page
