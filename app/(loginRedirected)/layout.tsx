import { FC, PropsWithChildren } from 'react'
import AuthRedirect from '../../src/utils/authRedirect'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login | Yachtease',
    icons: '/assets/favicon.png',
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/login`),
    openGraph: {
        type: 'website',
        url: process.env.NEXT_PUBLIC_CLIENT_URL,
        title: 'Login | Yachtease',
        images: '/preview.png',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Login | Yachtease',
        images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.png`],
    }
}

const layout: FC<PropsWithChildren> = ({ children }) => {
    return <AuthRedirect>{children}</AuthRedirect>
}

export default layout