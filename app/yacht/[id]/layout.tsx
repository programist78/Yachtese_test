import { FC, ReactNode } from 'react'
import { getClient } from '../../../src/config/getClient'
import {
    GET_YACHT,
    getYachtInput,
    getYachtResponse,
} from '../../../src/graphql/getYacht'
import { notFound } from 'next/navigation'
import YachtStoreInializer from '../../../src/utils/YachtStoreInializer'

interface Props {
    children: ReactNode
    params: { id: string }
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
