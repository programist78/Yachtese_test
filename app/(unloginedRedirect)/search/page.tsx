'use client'
import { useEffect, useState, FC, Dispatch, SetStateAction } from 'react'
import c from './Search.module.scss'
import { RootURLsEnum, loactionList, servicesList } from '../../../src/config/constants'
import Image from 'next/image'
import 'mapbox-gl/dist/mapbox-gl.css'
import ImageError from '../../../src/utils/ImageError'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Link from 'next/link'
import getLocalTime from '../../../src/utils/getLocalTime'
import { useMutation, useSuspenseQuery } from '@apollo/client'
import useAuthStore from '../../../src/stores/useAuthStore'
import { useRouter, useSearchParams } from 'next/navigation'
import { GET_ALL_SUPPLIERS, getAllSuppliercsResponse, getAllSuppliersInput } from '../../../src/graphql/getAllSuppliers'
import { addFavoriteSupplierInput, addFavoriteSupplierResponse, ADD_FAVORIVE_SUPPLIER, RESTORE_FAV_SUPPLIER, restoreFavoriteSupplierInput, restoreFavoriteSupplierResponse } from '../../../src/graphql/addToFavoriteSuppliers'
import { errorAlert } from '../../../src/utils/alerts'
import dynamic from 'next/dynamic'
const MapBox = dynamic(() => import('./Map'), { ssr: false })

const page: FC = () => {

    const params = useSearchParams()
    const pageNum = params.get('page')
    const router = useRouter()
    const [page, setPage] = useState(pageNum ? +pageNum : 1)
    const [isLocationPopupOpened, setIsLocationPopupOpened] = useState(false)
    const [isServicesPopupOpened, setIsServicesPopupOpened] = useState(false)
    const [services, setServices] = useState([])

    const { data } = useSuspenseQuery<getAllSuppliercsResponse, getAllSuppliersInput>(GET_ALL_SUPPLIERS, {
        variables: {
            getSuppliersByRoleInput: {
                page,
                service: services[0]
            }
        },
    })

    if (!data) {
        errorAlert()

        return <></>
    }

    const maxPage = Math.ceil(data.getSuppliersByRole.count ? data.getSuppliersByRole.count / 10 : 1)

    useEffect(() => {
        setPage(params.get('page') ? +params.get('page') : 1)
    }, [params])

    useEffect(() => {
        if (data.getSuppliersByRole && data.getSuppliersByRole.suppliers.length === 0) router.replace(`${RootURLsEnum.search}?page=1`)
    }, [data, router])

    return <div className={`${c.main} container`}>
        <MapBox suppliers={data.getSuppliersByRole.suppliers} />
        <div className={c.filters}>
            <button className={c.filter} onClick={() => setIsLocationPopupOpened(true)}>Location<Image src='/assets/filter.svg' alt='Filter Location' width={24} height={22} /></button>
            <button className={c.filter} onClick={() => setIsServicesPopupOpened(true)}>Services<Image src='/assets/filter.svg' alt='Filter Services' width={24} height={22} /></button>
        </div>
        {data.getSuppliersByRole && <div className={c.list_con}>
            <div className={c.list}>
                {data.getSuppliersByRole.suppliers.map((item, index) => <Supplier key={item._id} supplier={item} />)}
            </div>
        </div>}
        <div className={c.pagination}>
            {page > 1 && <button className={c.minus_page} onClick={() => router.replace(`${RootURLsEnum.search}?page=${page - 1}`)}>{'<'}</button>}
            <div>{page}</div>
            {page < maxPage && <button className={c.plus_page} onClick={() => router.replace(`${RootURLsEnum.search}?page=${page + 1}`)}>{'>'}</button>}
        </div>
        <LocationFilterPopup isOpen={isLocationPopupOpened} setIsOpen={setIsLocationPopupOpened} />
        <ServicesFilterPopup isOpen={isServicesPopupOpened} setIsOpen={setIsServicesPopupOpened} setServices={setServices} services={services} />
    </div>
}

interface SupplierProps {
    supplier: {
        avatarURL: string
        userName: string
        location: { lat: string, lon: string }
        _id: string
        description: string
        services: Array<string> | null
    }
}

const Supplier: FC<SupplierProps> = ({ supplier }) => {
    const [addFavoriteSupplier] = useMutation<addFavoriteSupplierResponse, addFavoriteSupplierInput>(ADD_FAVORIVE_SUPPLIER)
    const [restoreFavoriteSupplier] = useMutation<restoreFavoriteSupplierResponse, restoreFavoriteSupplierInput>(RESTORE_FAV_SUPPLIER)

    const userData = useAuthStore((state) => state.userData)
    const router = useRouter()

    const [localTime, setLocalTime] = useState(null)
    const [isMsgBtnHovered, setIsMsgBtnHoverd] = useState(false)
    const [isFavorite, setIsFavorite] = useState(() => {
        for (let i = 0; i < userData.favoriteSuppliers.length; i++) {
            const obj = userData.favoriteSuppliers[i]

            for (let j = 0; j < obj.id.length; j++) {
                if (obj.id[j]._id === supplier._id) return true
            }
        }

        return false
    })

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
                <Image src={isFavorite ? '/assets/liked.svg' : '/assets/like.svg'} onMouseMove={(e) => e.currentTarget.src = '/assets/liked.svg'} onMouseLeave={(e) => !isFavorite && (e.currentTarget.src = '/assets/like.svg')} alt='Add to favorite' height={45} width={45} onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (isFavorite) {
                        restoreFavoriteSupplier({
                            variables: {
                                restoreFavoriteSuppliersInput: {
                                    favoriteSuppliers: [
                                        ...userData.favoriteSuppliers.map(group => ({
                                            name: group.name,
                                            id: group.id.filter(id => id._id !== supplier._id).map((val) => val._id),
                                        }))
                                    ]
                                }
                            }
                        }).then(() => {
                            setIsFavorite(false)
                        }).catch(() => {
                            errorAlert()
                        })

                        return
                    }
                    addFavoriteSupplier({
                        variables: {
                            addFavoriteSuppliersGroupInput: {
                                name: 'all',
                                id: supplier._id
                            }
                        }
                    }).then(() => {
                        setIsFavorite(true)
                    }).catch(() => {
                        errorAlert()
                    })
                }} />
                <Image src={isMsgBtnHovered ? '/assets/message-hover.svg' : '/assets/message.svg'} alt='Add to favorite' height={45} width={45} onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    router.push(`${RootURLsEnum.messages}/${supplier._id}new`)
                }} onMouseEnter={() => setIsMsgBtnHoverd(true)} onMouseMove={() => setIsMsgBtnHoverd(true)} onMouseLeave={() => setIsMsgBtnHoverd(false)} />
            </div>
        </Link>
    )
}

const LocationFilterPopup: FC<{ isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }> = ({ isOpen, setIsOpen }) => {

    const [locations, setLocations] = useState([])
    const [openedGroupName, setOpenedGroupName] = useState('')

    return isOpen && <div className='backdrop' onClick={() => setIsOpen(false)}>
        <div className='popup' onClick={(e) => e.stopPropagation()}>
            <h3>Location</h3>
            {loactionList.map(({ countries, groupName }, index) => <div key={groupName}>
                <div className={`${c.input_con} ${c.accordeon_group}`} onClick={() => setOpenedGroupName((prev) => prev === groupName ? '' : groupName)}>
                    {groupName}
                </div>
                <div className={c.accordeon} style={openedGroupName === groupName ? { height: 'auto' } : { height: 0 }}>
                    {countries.map((item) => <div key={item} className={c.accordeon_item} onClick={(e) => setLocations((prev) => !prev.includes(item) ? [...prev, item] : prev.filter((p) => p !== item))}>
                        <label htmlFor={item} className={c.label} onClick={(e) => setLocations((prev) => !prev.includes(item) ? [...prev, item] : prev.filter((p) => p !== item))}>{item}</label>
                        <input id={item} name={item} type='checkbox' checked={locations.includes(item)} />
                    </div>)}
                </div>
            </div>)}
        </div>
    </div>
}

const ServicesFilterPopup: FC<{
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setServices: Dispatch<SetStateAction<string[]>>
    services: string[]
}> = ({ isOpen, setIsOpen, setServices, services }) => {
    return isOpen && <div className='backdrop' onClick={() => setIsOpen(false)}>
        <div className='popup' onClick={(e) => e.stopPropagation()}>
            <h3>Services</h3>
            {servicesList.map((item) => <div key={item} className={c.input_con} onClick={(e) => setServices((prev) => !prev.includes(item) ? [...prev, item] : prev.filter((p) => p !== item))}>
                <label htmlFor={item} className={c.label} onClick={(e) => setServices((prev) => !prev.includes(item) ? [...prev, item] : prev.filter((p) => p !== item))}>{item}</label>
                <input id={item} name={item} type='checkbox' checked={services.includes(item)} />
            </div>)}
        </div>
    </div>
}


export default page
