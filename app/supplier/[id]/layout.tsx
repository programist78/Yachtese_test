import { FC, ReactNode } from 'react'
import SupplierPageStoreInitializer from '../../../src/utils/SupplierPageStoreInitializer'
import { getClient } from '../../../src/config/getClient'
import {
    GET_SUPPLIER_BY_ID,
    getSupplierByIdInput,
    getSupplierByIdResponse,
} from '../../../src/graphql/getSupplierById'
import { Metadata } from 'next'
import { GET_REVIEW, getReviewsResponse } from '../../../src/graphql/getReviews'
import ReviewsStoreInitializer from '../../../src/utils/ReviewsStoreInitializer'

interface Props {
    children: ReactNode
    params: { id: string }
}

export const generateMetadata = async ({ params }): Promise<Metadata> => {

    const { data } = await getClient().query<
        getSupplierByIdResponse,
        getSupplierByIdInput
    >({
        query: GET_SUPPLIER_BY_ID,
        variables: {
            id: params.id,
        },
    })

    if (!data) {
        return {
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
    }

    return {
        title: `${data.getSupplierById.userName} | Yachtease`,
        icons: '/assets/favicon.png',
        metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/profile`),
        openGraph: {
            type: 'website',
            url: process.env.NEXT_PUBLIC_CLIENT_URL,
            title: `${data.getSupplierById.userName} | Yachtease`,
            images: '/preview.png',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.getSupplierById.userName} | Yachtease`,
            images: [`${process.env.NEXT_PUBLIC_CLIENT_URL}/preview.png`],
        }
    }
}

const layout: FC<Props> = async ({ children, params }) => {

    const [{ data: supplierData }, { data: reviewData }] = await Promise.all([
        getClient().query<getSupplierByIdResponse, getSupplierByIdInput>({ query: GET_SUPPLIER_BY_ID, variables: { id: params.id }}),
        getClient().query<getReviewsResponse>({ query: GET_REVIEW,  variables: { userId: params.id } })
    ])

    return (
        <>
            <SupplierPageStoreInitializer supplierData={supplierData.getSupplierById} />
            <ReviewsStoreInitializer data={reviewData.getUserReviews} />
            {children}
        </>
    )
}

export default layout
