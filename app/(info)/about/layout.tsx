import { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'

export const metadata: Metadata = {
    title: 'About | Yachtease',
    icons: '/assets/favicon.png',
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/about`),
    openGraph: {
        type: 'website',
        url: process.env.NEXT_PUBLIC_CLIENT_URL,
        title: 'About | Yachtease',
        images: '/preview.png',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About | Yachtease',
        images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.png`],
    }
}

const layout: FC<PropsWithChildren> = ({ children }) => {
    return children
}

export default layout
