import { Metadata } from 'next'
import { PropsWithChildren, FC } from 'react'

export const metadata: Metadata = {
  title: 'New Password | Yachtease',
  icons: '/assets/favicon.png',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/reset`),
  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    title: 'New Password | Yachtease',
    images: '/preview.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Password | Yachtease',
    images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.png`],
  }
}

const layout: FC<PropsWithChildren> = ({ children }) => {
  return children
}

export default layout
