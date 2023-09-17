'use client'
import { useEffect, useState, FC } from 'react'
import c from './Search.module.scss'
import ReactMapGl, { Marker, ViewState } from 'react-map-gl'
import { RootURLsEnum, mapProps } from '../../../src/config/constants'
import Image from 'next/image'
import 'mapbox-gl/dist/mapbox-gl.css'
import ImageError from '../../../src/utils/ImageError'
import Link from 'next/link'
import getLocalTime from '../../../src/utils/getLocalTime'
import { useMutation, useSuspenseQuery } from '@apollo/client'
import { ADD_FAVORIVE_SUPPLIER, addFavoriteSupplierInput, addFavoriteSupplierResponse } from '../../../src/graphql/addToFavoriteSuppliers'
import useAuthStore from '../../../src/stores/useAuthStore'
import { useRouter, useSearchParams } from 'next/navigation'
import { GET_ALL_SUPPLIERS, getAllSuppliercsResponse, getAllSuppliersInput } from '../../../src/graphql/getAllSuppliers'

const page: FC = () => {

    const params = useSearchParams()
    const router = useRouter()
    const [page, setPage] = useState(params.get('page') ? +params.get('page') : 1)
    const [selectedMarkerData, setSelectedMarkerData] = useState(null)
    
    const { data } = useSuspenseQuery<getAllSuppliercsResponse, getAllSuppliersInput>(GET_ALL_SUPPLIERS, {
        variables: {
            page
        }
    })
    const maxPage = Math.ceil(data.getSuppliersByRole.count / 10)

    useEffect(() => {
        setPage(+params.get('page'))
    }, [params])

    useEffect(() => {
        if(data.getSuppliersByRole && data.getSuppliersByRole.suppliers.length === 0) router.replace(`${RootURLsEnum.search}?page=1`)
    }, [data])

    const [viewport, setViewport] = useState<ViewState>({
        bearing: 0,
        latitude: 0,
        longitude: 0,
        padding: {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        },
        pitch: 0,
        zoom: 1.5,
    })

    return <div className={`${c.main} container`}>
            <ReactMapGl
                {...viewport}
                {...mapProps}
                onDrag={(e) => setViewport(e.viewState)}
                onZoom={(e) => setViewport(e.viewState)}
                onClick={() => setSelectedMarkerData(null)}
                style={{
                    height: '60vh',
                    width: '100%',
                    borderRadius: 15,
                    overflow: 'hidden',
                }}>
                {data.getSuppliersByRole.suppliers.map((item, index) => {
                    return (
                        item.location && (
                            <Marker
                                key={`Marker ${index}`}
                                latitude={Number(item.location.lat)}
                                longitude={Number(item.location.lon)}
                                anchor='center'>
                                <div className='marker_con'>
                                    <Image
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedMarkerData(item)
                                        }}
                                        src='/assets/marker.png'
                                        alt={`#${index}`}
                                        width={20}
                                        height={30}
                                    />
                                    {selectedMarkerData && (
                                        <div className={c.popup}>
                                            {selectedMarkerData.userName}
                                        </div>
                                    )}
                                </div>
                            </Marker>
                        )
                    )
                })}
            </ReactMapGl>
            {data.getSuppliersByRole && <div className={c.list_con}>
                <div className={c.list}>
                    {data.getSuppliersByRole.suppliers.map((item, index) => <Supplier key={item._id} supplier={item} />)}
                </div>
            </div>}
            <div className={c.pagination}>
            {page > 1 &&<button className={c.minus_page} onClick={() => router.replace(`${RootURLsEnum.search}?page=${page - 1}`)}>{'<'}</button>}
                <div>{page}</div>
                {page < maxPage && <button className={c.plus_page} onClick={() => router.replace(`${RootURLsEnum.search}?page=${page + 1}`)}>{'>'}</button>}
            </div>
        </div>
}

interface SupplierProps {
    supplier: {
        avatarURL:string
        userName: string
        location:{ lat:string, lon:string }
        _id:string
        description: string
        services: Array<string> | null
    }
}

const Supplier: FC<SupplierProps> = ({ supplier }) => {

    const [addToFavorite] = useMutation<addFavoriteSupplierResponse, addFavoriteSupplierInput>(ADD_FAVORIVE_SUPPLIER)

    const userData = useAuthStore((state) => state.userData)
    const router = useRouter()

    const [localTime, setLocalTime] = useState(null)
    const [isFavorite, setIsFavorite] = useState(userData.favoriteSuppliers.filter((item) => item.id.filter((item) => item._id === supplier._id)).length > 0)

    useEffect(() => {
        if (!supplier.location) return
        getLocalTime(supplier.location).then((res) => {
            if (res) setLocalTime(res)
        })
    }, [supplier.location])

    return (
        <Link href={`/supplier/${supplier._id}`} className={c.supplier}>
            <div className={c.supplier_con}>
                <ImageError
                    src={supplier.avatarURL}
                    alt={supplier.userName}
                    className={c.img}
                />
                <div className={c.texts}>
                    <div className={c.titles}>
                        <h2>{supplier.userName}</h2>
                        {localTime && (
                            <span className={c.time}>
                                Local time: {localTime}
                            </span>
                        )}
                    </div>
                    {supplier.description && (
                        <p className={c.description}>{supplier.description}</p>
                    )}
                </div>
                {supplier.services && supplier.services[0] && (
                    <div className={c.services}>
                        <h3 className={c.all_services}>All Services</h3>
                        <div className={c.services_list}>
                            {supplier.services.map((item) => (
                                <div
                                    key={`${item}${supplier._id}`}
                                    className={c.service}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className={c.btns}>
                <Image src='/assets/like.svg' alt='Add to favorite' height={45} width={45} onClick={(e) => {
                    // debugger // Залишив для того щоб пам'ятати що в цьому місці проблема з бекендом і треба буде доробити
                    // e.stopPropagation()
                    // e.preventDefault()
                    // if(!isFavorite) {
                    //     addToFavorite({
                    //         variables: {
                    //             addFavoriteSupplierInput: {
                    //                 favoriteSuppliers: supplier._id
                    //             }
                    //         }
                    //     })
                    // }
                }}/>
                <Image src='/assets/message.svg' alt='Add to favorite' height={45} width={45} onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    router.push(`${RootURLsEnum.messages}/${supplier._id}new`)}
                }/>
            </div>
        </Link>
    )
}

export default page
