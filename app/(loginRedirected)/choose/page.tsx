import React from 'react'
import c from './Choose.module.scss'
import classNames from 'classnames'
import Button from '../../../src/components/Button/Button'
import { RootURLsEnum } from '../../../src/config/constants'
import Image from 'next/image'

const page: React.FC = () => {
    return (
        <main
            style={{ position: 'relative' }}
            className={classNames(c.main, 'filtered_image_container')}
        >
            <Image src='/assets/choose-bg.jpg' alt='Background' height={1920} width={2280} />
            <article className={c.block}>
                <h2>Please select your membership option:</h2>
                <Button text='Yacht' href={RootURLsEnum.regiserYacht} />
                <Button text='Supplier' href={RootURLsEnum.regiserSupplier} />
            </article>
        </main>
    )
}

export default page
