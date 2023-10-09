import React from 'react'
import c from './Footer.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { RootURLsEnum } from '../../config/constants'


const Footer: React.FC = () => {
    return <footer className={c.main}>
        <div className={c.border}>
            <div className={c.left}>
                <Image src='/assets/logo.png' alt='Yachtease' width={846} height={307} />
                <div className={c.icons}>
                    <a href={process.env.NEXT_PUBLIC_INSTAGRAM_LINK}>
                        <Image src='/assets/instagram.svg' alt='Yachtease' width={24} height={24} />
                    </a>
                    <a href={process.env.NEXT_PUBLIC_FACEBOOK_LINK}>
                        <Image src='/assets/facebook.svg' alt='Yachtease' width={24} height={24} />
                    </a>
                </div>
            </div>
            <div className={c.menu}>
                <div className={c.menu_item}>
                    <Link href={RootURLsEnum.about}>About Us</Link>
                    <Link href={RootURLsEnum.privacy}>Privacy Policy</Link>
                    <Link href={RootURLsEnum.instructions}>Instructions</Link>
                </div>
                <div className={c.menu_item}>
                    <Link href={RootURLsEnum.login}>Log In</Link>
                    <Link href={RootURLsEnum.registerChoose}>Sign Up</Link>
                </div>
            </div>
        </div>
        <div className={c.descr}>© Copyright Yachtease 2023. All rights reserved.</div>
    </footer>
}

export default Footer
