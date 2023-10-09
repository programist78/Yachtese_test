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
import MessageScript from '../src/components/MessageScript/MessageScript'

export const metadata: Metadata = {
    title: 'Yachtease',
    icons: '/assets/favicon.svg',
    metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL),
    description: 'Welcome to our premier yachting connection hub. A unique platform developed to simplifying the yachting industry. Yachtease, not only connects suppliers, but all yacht related necessities with yacht crew worldwide. Geo Location, suppliers & services. With a brand new ever evolving platform.',
    authors: [
        {
            name: 'webXwiz',
            url: 'https://webxwiz.com',
        },
        {
            name: 'Bohdan Shtahret',
            url: 'https://www.linkedin.com/in/bohdan-shtanhret-310966261/',
        },
    ],
    openGraph: {
        type: 'website',
        url: process.env.NEXT_PUBLIC_CLIENT_URL,
        title: 'Yachtease',
        images: '/preview.png',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Yachtease',
        images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.png`],
    }
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
                    <MessageScript />
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
                <MessageScript />
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
                <MessageScript />
            </html>
        )
    }
}

export default RootLayout
