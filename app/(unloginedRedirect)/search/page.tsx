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
    const [locations, setLocations] = useState([])
    const [view, setView] = useState<'NEW' | 'FAV' | 'OLD'>('NEW')

    const { data } = useSuspenseQuery<getAllSuppliercsResponse, getAllSuppliersInput>(GET_ALL_SUPPLIERS, {
        variables: {
            getSuppliersByRoleInput: {
                page,
                service: services,
                country: locations,
                view
            }
        },
        fetchPolicy: 'no-cache'
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
        <MapBox suppliers={data.getSuppliersByRole.mapSuppliers} />
        <span className={c.lil_desc}>The faded white circle indicates the area serviced by the supplier.</span>
        <div className={c.filters}>
            <button className={c.filter} onClick={() => setIsLocationPopupOpened(true)}>Location<Image src='/assets/filter.svg' alt='Filter Location' width={24} height={22} /></button>
            <button className={c.filter} onClick={() => setIsServicesPopupOpened(true)}>Services<Image src='/assets/filter.svg' alt='Filter Services' width={24} height={22} /></button>
        </div>
        {data.getSuppliersByRole && <div className={c.list_con}>
            <div className={c.type_filters}>
                <button className={view === 'NEW' ? c.selected : c.a} onClick={() => {
                    setLocations([])
                    setServices([])
                    setView('NEW')
                }}>All suppliers</button>
                <button className={view === 'FAV' ? c.selected : c.a} onClick={() => setView('FAV')}>Favourite suppliers</button>
                <button className={view === 'OLD' ? c.selected : c.a} onClick={() => setView('OLD')}>Olders suppliers</button>
            </div>
            {data.getSuppliersByRole.suppliers.length > 0 ?<div className={c.list}>
                {data.getSuppliersByRole.suppliers.map((item, index) => <Supplier key={item._id} supplier={item} />)}
            </div> : <div className={c.empty_list}>We can't find anyone...</div>}
        </div>}
        <div className={c.pagination}>
            {page > 1 && maxPage !== 1 && <button className={c.minus_page} onClick={() => router.replace(`${RootURLsEnum.search}?page=${page - 1}`)}>{'<'}</button>}
            <div>{page}</div>
            {page < maxPage && maxPage !== 1 && <button className={c.plus_page} onClick={() => router.replace(`${RootURLsEnum.search}?page=${page + 1}`)}>{'>'}</button>}
        </div>
        <LocationFilterPopup isOpen={isLocationPopupOpened} setIsOpen={setIsLocationPopupOpened} location={locations} setLocation={setLocations} />
        <ServicesFilterPopup isOpen={isServicesPopupOpened} setIsOpen={setIsServicesPopupOpened} setServices={setServices} services={services} />
    </div>
}

interface SupplierProps {
    supplier: {
        avatarURL: string
        companyName: string
        rating: number
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
                    alt={supplier.companyName}
                    className={c.img}
                />
                <div className={c.texts}>
                    <div className={c.titles}>
                        <h2>{supplier.companyName}</h2>
                        {supplier.rating > 0 && <span className={c.rating}>
                            {supplier.rating.toFixed(1)}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11 0.984131C11.3806 0.984131 11.7283 1.2002 11.8967 1.54151L14.7543 7.3306L21.1447 8.26465C21.5212 8.31968 21.8339 8.58369 21.9513 8.9457C22.0687 9.30771 21.9704 9.70496 21.6978 9.97049L17.0746 14.4735L18.1656 20.8351C18.23 21.2103 18.0757 21.5895 17.7678 21.8132C17.4598 22.0369 17.0515 22.0664 16.7146 21.8892L11 18.884L5.28548 21.8892C4.94856 22.0664 4.54027 22.0369 4.2323 21.8132C3.92432 21.5895 3.77007 21.2103 3.83442 20.8351L4.92551 14.4735L0.302296 9.97049C0.0296782 9.70496 -0.0685946 9.30771 0.0487831 8.9457C0.166161 8.58369 0.478841 8.31968 0.855401 8.26465L7.24577 7.3306L10.1033 1.54151C10.2718 1.2002 10.6194 0.984131 11 0.984131ZM11 4.24339L8.80674 8.68676C8.6612 8.9816 8.38001 9.18606 8.05466 9.23362L3.14844 9.95073L6.69776 13.4078C6.93364 13.6375 7.0413 13.9686 6.98564 14.2932L6.14821 19.1758L10.5346 16.8691C10.826 16.7158 11.1741 16.7158 11.4655 16.8691L15.8518 19.1758L15.0144 14.2932C14.9588 13.9686 15.0664 13.6375 15.3023 13.4078L18.8516 9.95073L13.9454 9.23362C13.62 9.18606 13.3389 8.9816 13.1933 8.68676L11 4.24339Z" fill="#FBE30A"/>
                            </svg>
                        </span>}
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

const LocationFilterPopup: FC<{ isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, setLocation: Dispatch<SetStateAction<string[]>>, location:string[] }> = ({ isOpen, setIsOpen, setLocation, location }) => {

    const [openedGroupName, setOpenedGroupName] = useState('')

    return isOpen && <div className='backdrop' onClick={() => setIsOpen(false)}>
        <div className='popup' onClick={(e) => e.stopPropagation()}>
            <h3>Location</h3>
            {loactionList.map(({ countries, groupName }, index) => <div key={groupName}>
                <div className={`${c.input_con} ${c.accordeon_group}`} onClick={() => setOpenedGroupName((prev) => prev === groupName ? '' : groupName)}>
                    {groupName}
                </div>
                <div className={c.accordeon} style={openedGroupName === groupName ? { height: 'auto' } : { height: 0 }}>
                    {countries.map((item) => <div key={item} className={c.accordeon_item} onClick={(e) => setLocation((prev) => prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item])}>
                        <label htmlFor={item} className={c.label} onClick={(e) => setLocation((prev) => prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item])}>{item}</label>
                        <input id={item} name={item} type='checkbox' checked={location.includes(item)} />
                    </div>)}
                </div>
            </div>)}
            <div className={c.accordeon_item} onClick={() => setLocation((prev) => prev.includes('World wide') ? prev.filter((i) => i !== 'World wide') : [...prev, 'World wide'])}>
                <label htmlFor={'World wide'} className={c.label} onClick={(e) => setLocation((prev) => prev.includes('World wide') ? prev.filter((i) => i !== 'World wide') : [...prev, 'World wide'])}>{'World wide'}</label>
                <input id={'World wide'} name={'World wide'} type='checkbox' readOnly checked={location.includes('World wide')} />
            </div>
        </div>
    </div>
}

const ServicesFilterPopup: FC<{
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setServices: Dispatch<SetStateAction<string[]>>
    services: string[]
}> = ({ isOpen, setIsOpen, setServices, services: servicesProps }) => {
    const [openedGroupName, setOpenedGroupName] = useState('')

    return isOpen && <div className='backdrop' onClick={() => setIsOpen(false)}>
        <div className='popup' onClick={(e) => e.stopPropagation()}>
            <h3>Services</h3>
            {servicesList.map(({ services, groupName }, index) => <div key={groupName}>
                <div className={`${c.input_con} ${c.accordeon_group}`} onClick={() => setOpenedGroupName((prev) => prev === groupName ? '' : groupName)}>
                    {groupName}
                </div>
                <div className={c.accordeon} style={openedGroupName === groupName ? { height: 'auto' } : { height: 0 }}>
                    {services.map((item) => <div key={item} className={c.accordeon_item} onClick={(e) => setServices((prev) => prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item])}>
                        <label htmlFor={item} className={c.label} onClick={(e) => setServices((prev) => prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item])}>{item}</label>
                        <input id={item} name={item} type='checkbox' checked={servicesProps.includes(item)} />
                    </div>)}
                </div>
            </div>)}
        </div>
    </div>
}


export default page
