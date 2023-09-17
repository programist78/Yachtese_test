import React from 'react'
import '../src/styles/index.scss'
import Header from '../src/components/Header/Header'
import { Metadata } from 'next'
/* eslint-disable */ import { Alegreya_Sans } from 'next/font/google'
import Providers from '../src/config/Providers'
import StoreInitializer from '../src/utils/AuthStoreInitializer'
import CookiesAlert from '../src/components/CookiesAlert/CookiesAlert'
import { getClient } from '../src/config/getClient'
import { GET_USER_BY_TOKEN } from '../src/graphql/getUserByToken'
import SubscriptionMessages from '../src/components/SubscriptionMessages/SubscriptionMessages'

export const metadata: Metadata = {
    title: 'Yachtease',
    icons: '/assets/favicon.png',
}

const font = Alegreya_Sans({
    weight: '400',
    subsets: ['latin'],
})

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
    try {
        const { data, error } = await getClient().query({
            query: GET_USER_BY_TOKEN,
        })

        if (!error) {
            return (
                <html lang='en'>
                    <body className={font.className}>
                        <div className='main'>
                            <StoreInitializer
                                isLogined={true}
                                userData={data.getUserByToken}
                            />
                            <CookiesAlert />
                            <Providers>
                                <SubscriptionMessages />
                                <Header />
                                {children}
                            </Providers>
                        </div>
                    </body>
                </html>
            )
        }

        return (
            <html lang='en'>
                <body className={font.className}>
                    <div className='main'>
                        <StoreInitializer isLogined={false} userData={null} />
                        <CookiesAlert />
                        <Providers>
                            <Header />
                            {children}
                        </Providers>
                    </div>
                </body>
            </html>
        )
    } catch (e) {
        return (
            <html lang='en'>
                <body className={font.className}>
                    <StoreInitializer isLogined={false} userData={null} />
                    <CookiesAlert />
                    <Providers>
                        <Header />
                        {children}
                    </Providers>
                </body>
            </html>
        )
    }
}

export default RootLayout
