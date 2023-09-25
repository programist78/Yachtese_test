import { FC, ReactNode } from 'react'
import { getClient } from '../../../src/config/getClient'
import {
    GET_YACHT,
    getYachtInput,
    getYachtResponse,
} from '../../../src/graphql/getYacht'
import { notFound } from 'next/navigation'
import YachtStoreInializer from '../../../src/utils/YachtStoreInializer'
import { Metadata } from 'next'

interface Props {
    children: ReactNode
    params: { id: string }
}

export const generateMetadata = async ({ params, searchParams }): Promise<Metadata> => {

    try {
        const { data } = await getClient().query<
            getYachtResponse,
            getYachtInput
        >({
            query: GET_YACHT,
            variables: {
                id: params.id,
            },
        })

        if (!data) return {
            title: 'User not Found | Yachtease',
            icons: '/assets/favicon.png',
            metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/profile`),
            openGraph: {
                type: 'website',
                url: process.env.NEXT_PUBLIC_CLIENT_URL,
                title: 'User not Found | Yachtease',
                images: '/preview.png',
            },
            twitter: {
                card: 'summary_large_image',
                title: 'User not Found | Yachtease',
                images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.png`],
            }
        }

        return {
            title: `${data.getYachtById.userName} | Yachtease`,
            icons: '/assets/favicon.png',
            metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/profile`),
            openGraph: {
                type: 'website',
                url: process.env.NEXT_PUBLIC_CLIENT_URL,
                title: `${data.getYachtById.userName} | Yachtease`,
                images: '/preview.png',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${data.getYachtById.userName} | Yachtease`,
                images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.png`],
            }
        }
    } catch {
        return {
            title: 'User not Found | Yachtease',
            icons: '/assets/favicon.png',
            metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/profile`),
            openGraph: {
                type: 'website',
                url: process.env.NEXT_PUBLIC_CLIENT_URL,
                title: 'User not Found | Yachtease',
                images: '/assets/favicon.png',
            },
            twitter: {
                card: 'summary_large_image',
                title: 'User not Found | Yachtease',
                images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/assets/favicon.png`],
            }
        }
    }
}

const layout: FC<Props> = async ({ children, params }) => {
    try {
        const { data } = await getClient().query<
            getYachtResponse,
            getYachtInput
        >({
            query: GET_YACHT,
            variables: {
                id: params.id,
            },
        })

        if (!data) return notFound()

        return (
            <>
                <YachtStoreInializer yachtData={data.getYachtById} />
                {children}
            </>
        )
    } catch {
        return notFound()
    }
}

export default layout
