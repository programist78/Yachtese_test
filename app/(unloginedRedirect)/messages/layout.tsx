import { FC, PropsWithChildren } from 'react'
import c from './Messages.module.scss'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Messages | Yachtease',
    icons: '/assets/favicon.png',
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/messages`),
    openGraph: {
        type: 'website',
        url: process.env.NEXT_PUBLIC_CLIENT_URL,
        title: 'Messages | Yachtease',
        images: '/preview.png',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Messages | Yachtease',
        images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.png`],
    }
}

const layout: FC<PropsWithChildren> = ({ children }) => {
    return <main className={`${c.main} container`}>
        {children}
    </main>
}

export default layout
