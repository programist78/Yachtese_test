import { FC, ReactNode } from 'react'
import SupplierPageStoreInitializer from '../../../src/utils/SupplierPageStoreInitializer'
import { getClient } from '../../../src/config/getClient'
import {
    GET_SUPPLIER_BY_ID,
    getSupplierByIdInput,
    getSupplierByIdResponse,
} from '../../../src/graphql/getSupplierById'

interface Props {
    children: ReactNode
    params: { id: string }
}

const layout: FC<Props> = async ({ children, params }) => {
    const { data } = await getClient().query<
        getSupplierByIdResponse,
        getSupplierByIdInput
    >({
        query: GET_SUPPLIER_BY_ID,
        variables: {
            id: params.id,
        },
    })

    return (
        <>
            <SupplierPageStoreInitializer supplierData={data.getSupplierById} />
            {children}
        </>
    )
}

export default layout
