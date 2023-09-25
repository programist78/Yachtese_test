import { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'

export const metadata: Metadata = {
    title: 'Instructions | Yachtease',
    icons: '/assets/favicon.png',
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/instructions`),
    openGraph: {
        type: 'website',
        url: process.env.NEXT_PUBLIC_CLIENT_URL,
        title: 'Instructions | Yachtease',
        images: '/preview.png',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Instructions | Yachtease',
        images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.png`],
    }
}

const layout: FC<PropsWithChildren> = ({ children }) => {
    return children
}

export default layout
