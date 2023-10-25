import { Metadata } from 'next'
import { PropsWithChildren, FC } from 'react'
import { SubscriptionRedirect } from '../../../src/utils/authRedirect'

export const metadata: Metadata = {
  title: 'Your Profile | Yachtease',
  icons: '/assets/favicon.png',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/profile`),
  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    title: 'Your Profile | Yachtease',
    images: '/preview.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Profile | Yachtease',
    images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.png`],
  }
}

const layout: FC<PropsWithChildren> = ({ children }) => {
  // return <SubscriptionRedirect>
  return children
  // </SubscriptionRedirect>
}

export default layout
