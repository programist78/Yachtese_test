import { FC, ReactNode } from 'react'
import { getClient } from '../../../../src/config/getClient'
import {
    GET_MESSAGES,
    getMessagesInput,
    getMessagesResponse,
} from '../../../../src/graphql/getMessages'
import MessagesStoreInitializer from '../../../../src/utils/MessagesStoreInitializer'
import { redirect } from 'next/navigation'
import { RootURLsEnum } from '../../../../src/config/constants'
import { gql } from '@apollo/client'
import { Metadata } from 'next'

interface Props {
    children: ReactNode
    params: { id: string }
}

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

const layout: FC<Props> = async ({ params, children }) => {
    if (params.id.includes('new')) {
        try {
            const { data } = await getClient().query({
                query: gql`
                    query GetSupplierById($id: String!) {
                        getSupplierById(_id: $id) {
                            avatarURL
                            _id
                            userName
                        }
                    }
                `,// role add
                variables: {
                    id: params.id.replace('new', '')
                }
            })

            return (
                <>
                    <MessagesStoreInitializer
                        messagesList={[]}
                        chatId={params.id}
                        newChatUserData={data.getSupplierById}
                    />
                    {children}
                </>
            )
        } catch (err) {
            redirect(RootURLsEnum.messages)
        }
    }

    try {
        const { data } = await getClient().query<
            getMessagesResponse,
            getMessagesInput
        >({
            query: GET_MESSAGES,
            variables: { getMessagesInput: { chatId: params.id } }
        })

        if (!data) redirect(RootURLsEnum.messages)

        return (
            <>
                <MessagesStoreInitializer
                    messagesList={data.getMessages.messages}
                    offers={data.getMessages.offers}
                    chatId={params.id}
                />
                {children}
            </>
        )
    } catch (err) {
        redirect(RootURLsEnum.messages)
    }
}

export default layout
