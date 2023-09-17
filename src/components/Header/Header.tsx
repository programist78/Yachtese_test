'use client'
import React, { useEffect, useRef, useState } from 'react'
import c from './Header.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import Link from 'next/link'
import useAuthStore from '../../stores/useAuthStore'
import { RootURLsEnum } from '../../config/constants'
import Cookies from 'js-cookie'

const Header: React.FC = () => {
    const isLogined = useAuthStore((state) => state.isLogined)
    const setUserData = useAuthStore((state) => state.setUserData)
    const userData = useAuthStore((state) => state.userData)
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const menuRef = useRef(null)

    const notificationCount = isLogined ? userData.chats.filter((item) => item.notification === true).length : 0

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpened(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    const logOut = () => {
        Cookies.remove('token')
        setUserData(null)
    }

    return (
        <header className={c.main}>
            <div className={classNames('container', c.con)}>
                <Link href={isLogined && (userData.role === 'YACHT' || userData.role === 'YACHT_BUSINESS' || userData.role === 'YACHT_TEAMMATE') ? RootURLsEnum.search : RootURLsEnum.homepage} className={c.logo}>
                    <Image
                        src='/assets/logo.png'
                        alt='Yachtease'
                        width={846}
                        height={307}
                    />
                </Link>
                <nav
                    className={
                        isMenuOpened ? `${c.nav}` : `${c.nav} ${c.hidden}`
                    }
                >
                    <Link href={isLogined && (userData.role === 'YACHT' || userData.role === 'YACHT_BUSINESS' || userData.role === 'YACHT_TEAMMATE') ? RootURLsEnum.search : RootURLsEnum.homepage}>Home</Link>
                    <Link href={RootURLsEnum.about}>About</Link>
                    <Link href={RootURLsEnum.privacy}>Privacy Policy</Link>
                    {isLogined ? (
                        <>
                            <Link href={RootURLsEnum.profile}>Profile</Link>
                            <Link href={RootURLsEnum.messages}>Messages {notificationCount > 0 && <span className={c.notification}>{notificationCount}</span>}</Link>
                            <Link href={RootURLsEnum.homepage} onClick={logOut}>
                                Log Out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={RootURLsEnum.instructions}>
                                Instructions
                            </Link>
                            <Link href={RootURLsEnum.login}>Log In</Link>
                            <Link href={RootURLsEnum.registerChoose}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
                <button
                    ref={menuRef}
                    className={c.burger}
                    onClick={() => setIsMenuOpened((p) => !p)}
                >
                    <Image
                        src='/assets/burger-menu.svg'
                        alt='Menu'
                        height={40}
                        width={40}
                    />
                </button>
            </div>
        </header>
    )
}

export default Header
