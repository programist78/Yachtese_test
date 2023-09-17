import React from 'react'
import c from './NotFound.module.scss'
import Title from '../src/components/Title/Title'
import Link from 'next/link'
import { RootURLsEnum } from '../src/config/constants'

const page: React.FC = (props) => {
    return (
        <main className={c.main}>
            <div className={`${c.block} block`}>
                <Title className={c.title}>Opps...</Title>
                <h1 className={c.num}>404</h1>
                <span>This Page is not Found!</span>
                <Link href={RootURLsEnum.homepage} className={c.btn}>
                    Go Back
                </Link>
            </div>
        </main>
    )
}

export default page
