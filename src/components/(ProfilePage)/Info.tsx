import { useEffect, useState, useTransition, FC } from 'react'
import c from './styles/Info.module.scss'
import EditIcon from '../EditIcon/EditIcon'
import useAuthStore from '../../stores/useAuthStore'
import Geocode from 'react-geocode'
import { useMutation } from '@apollo/client'
import {
    ADD_SUPLIER_SERVICE,
    addSupplierServiceInput,
    addSupplierServiceResponse,
} from '../../graphql/addSuplierService'
import { errorAlert, successAlert } from '../../utils/alerts'
import { DELETE_SUPPLIER_SERVICE, deleteSupplierServiceInput, deleteSupplierServiceResponse } from '../../graphql/deleteSupplierService'
import { UPDATE_DEPARTMENTS, updateDepartmentsInput, updateDepartmentsResponse } from '../../graphql/updateDepartments'
import { UPDATE_LOCATION, updateLocationInput, updateLocationResponse } from '../../graphql/updateLocation'
import useTeamMatesPopupStore from '../../stores/useTeamMatesPopupStore'
import useYachtPageStore from '../../stores/useYachtPageStore'
import useSupplierPageStore from '../../stores/useSupplierPageStore'
import useFavoriteSuppliersPopupStore from '../../stores/useFavoriteSuppliersPopupStore'
import FavoriteSuppliersPopup from '../FavoriteSuppliersPopup/FavoriteSuppliersPopup'
import { loactionList, servicesList } from '../../config/constants'

export const SupplierInfo: FC = () => {
    return (
        <article className='block'>
            <Location />
            <Services />
        </article>
    )
}

export const YachtInfo: FC = () => {
    const userData = useAuthStore((state) => state.userData)

    return (
        <article className='block'>
            <Departments />
            {userData.favoriteSuppliers.length > 0 && <FavouriteSuppliers />}
            {userData.teamMates.length > 0 && <Teammates />}
            <FavoriteSuppliersPopup />
        </article>
    )
}

export const YachtTeammateInfo: FC = () => {
    const userData = useAuthStore((state) => state.userData)

    return <article className='block'>
        <Departments />
        {userData.favoriteSuppliers.length > 0 && <FavouriteSuppliers />}
        <FavoriteSuppliersPopup />
    </article>
}

export const YachtBussinesInfo: FC = () => {

    const userData = useAuthStore((state) => state.userData)

    return <article className='block'>
        <Departments />
        {userData.favoriteSuppliers.length > 0 && <FavouriteSuppliers />}
        {userData.teamMates.length > 0 && <Teammates />}
    </article>
}

export const YachtPageInfo: FC = () => {
    const yachtData = useYachtPageStore((state) => state.yachtData)

    if (
        !yachtData.departments ||
        (yachtData.departments.length < 1 && !yachtData.teamMates)
    )
        return null

    return (
        <article className='block'>
            {yachtData.departments && (
                <div>
                    <h4 className={c.title}>Departments</h4>
                    <div className={c.departmets_list}>
                        {yachtData.departments.map((dep) => (
                            <>
                                <div key={dep} className={c.department}>
                                    {dep}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            )}
        </article>
    )
}

export const SupplierViewInfo: FC = () => {
    const services = useSupplierPageStore(
        (state) => state.supplierData.services,
    )

    return (
        <article className='block'>
            <h4 className={`${c.title} ${c.services_title}`}>All Services</h4>
            {services.map((name) => (
                <span key={name} className={c.service_view}>
                    {name}
                </span>
            ))}
        </article>
    )
}

const Location: FC = () => {
    const [updateLocation] = useMutation<updateLocationResponse, updateLocationInput>(UPDATE_LOCATION)

    const [isEditable, setIsEditable] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const userData = useAuthStore((state) => state.userData)
    const [place, setPlace] = useState('')
    const [placeInState, setPlaceInState] = useState('')
    const [_, startTransition] = useTransition()
    const [openedGroupName, setOpenedGroupName] = useState('')
    const [selectedCountries, setSelectedCountries] = useState(userData.country ? userData.country : [])
    const [radius, setRadius] = useState(
        userData.location.radius ? userData.location.radius : null,
    )
    const [pos, setPos] = useState<{ latitude: string; longitude: string }>(
        () => {
            if (!userData.location.lat || !userData.location.lon)
                return { latitude: '', longitude: '' }

            return {
                latitude: userData.location.lat,
                longitude: userData.location.lon,
            }
        },
    )

    useEffect(() => {
        if (!place) return
        const tim = setTimeout(() => {
            Geocode.fromAddress(place, process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY)
                .then((res) => {
                    setError(null)
                    setPos({
                        latitude: res.results[0].geometry.location.lat,
                        longitude: res.results[0].geometry.location.lng,
                    })
                })
                .catch((e) => {
                    setError('Wrong address!')
                    setPos({ latitude: '', longitude: '' })
                })
        }, 1000)

        return () => clearTimeout(tim)
    }, [place])

    useEffect(() => {
        if (!pos.latitude || !pos.longitude)
            return setPlaceInState('Add location')
        Geocode.fromLatLng(
            pos.latitude,
            pos.longitude,
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        ).then((res) => {
            setPlaceInState(
                res.results[Math.round(res.results.length / 2)]
                    .formatted_address,
            )
            setPlace(
                res.results[Math.round(res.results.length / 2)]
                    .formatted_address,
            )
        })
    }, [pos.latitude, pos.longitude])

    const handleSubmit = () => {
        if (!place || !pos.latitude) return setError('Address is required')
        if (!selectedCountries) return setError('Country is required')

        updateLocation({
            variables: {
                changeLocationInput: {
                    location: {
                        lat: pos.latitude,
                        lon: pos.longitude,
                        radius: Number(radius),
                    },
                    country: selectedCountries
                },
            },
        }).then(async (res) => {
            const adr = await Geocode.fromLatLng(
                res.data.changeLocation.location.lat,
                res.data.changeLocation.location.lon,
                process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
            ).then((res) => {
                return res.results[Math.round(res.results.length / 2)]
                    .formatted_address
            })

            setPlaceInState(adr)
            setIsEditable(false)
        })
    }

    return (
        <>
            <h4 className={c.title}>
                Location
                {isEditable ? (
                    <EditIcon isOn={isEditable} onClick={handleSubmit} />
                ) : (
                    <EditIcon
                        isOn={isEditable}
                        onClick={() => setIsEditable(true)}
                    />
                )}
            </h4>
            <h6 className={c.min_title}>Add/Change</h6>
            <div>
                {isEditable ? (
                    <>
                        <input
                            className={c.input}
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            placeholder={placeInState}
                        />
                        {error && <span>{error}</span>}
                    </>
                ) : (
                    <h3 className={c.location}>
                        {placeInState ? placeInState : 'Loading...'}
                    </h3>
                )}
            </div>
            <div>
                <input
                    className={c.min_input}
                    value={pos.latitude}
                    readOnly
                    placeholder='Latitude'
                />
                <input
                    className={c.min_input}
                    value={pos.longitude}
                    readOnly
                    placeholder='Longitude'
                />
            </div>
            <div>
                <input
                    className={c.min_input}
                    type='number'
                    value={radius}
                    onChange={
                        isEditable
                            ? (e) =>
                                startTransition(() =>
                                    setRadius(
                                        Number(e.target.value) > 1000
                                            ? '1000'
                                            : e.target.value,
                                    ),
                                )
                            : () => { }
                    }
                    placeholder='Radius'
                />
                <input
                    className={c.radius}
                    type='range'
                    min={1}
                    max={1000}
                    step={1}
                    value={radius}
                    onChange={
                        isEditable
                            ? (e) =>
                                startTransition(() =>
                                    setRadius(e.target.value),
                                )
                            : () => { }
                    }
                />
            </div>
            {loactionList.map(({ countries, groupName }) => <div key={groupName}>
                <div className={`${c.input_con} ${c.accordeon_group}`} onClick={() => setOpenedGroupName((prev) => prev === groupName ? '' : groupName)}>
                    {groupName}
                </div>
                <div className={c.accordeon} style={openedGroupName === groupName ? { height: 'auto' } : { height: 0 }}>
                    {countries.map((item) => <div key={item} className={c.accordeon_item} onClick={(e) => isEditable && setSelectedCountries((prev) => prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item])}>
                        <label htmlFor={item} className={c.label} onClick={(e) => isEditable && setSelectedCountries((prev) => prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item])}>{item}</label>
                        <input id={item} name={item} type='checkbox' readOnly checked={selectedCountries.includes(item)} />
                    </div>)}
                </div>
            </div>)}
            <div className={c.accordeon_item} onClick={() => isEditable && setSelectedCountries((prev) => prev.includes('World wide') ? prev.filter((i) => i !== 'World wide') : [...prev, 'World wide'])}>
                <label htmlFor={'World wide'} className={c.label} onClick={(e) => isEditable && setSelectedCountries((prev) => prev.includes('World wide') ? prev.filter((i) => i !== 'World wide') : [...prev, 'World wide'])}>{'World wide'}</label>
                <input id={'World wide'} name={'World wide'} type='checkbox' readOnly checked={selectedCountries.includes('World wide')} />
            </div>
        </>
    )
}

const Services: FC = () => {
    const [isEditable, setIsEditable] = useState(false)
    const services = useAuthStore((state) => state.userData.services)


    return (
        <div className={c.space_top}>
            <h4 className={`${c.title} ${c.services_title}`}>
                All Services
                <EditIcon
                    isOn={isEditable}
                    onClick={() => setIsEditable((p) => !p)}
                />
            </h4>
            {!isEditable ? services.map((item) => <Service key={item} name={item} isEditable={isEditable} isExist={services.includes(item)} />)
                : servicesList.map((item) => <Service key={item} name={item} isEditable={isEditable} isExist={services.includes(item)} />)}
        </div>
    )
}

const Service: FC<{ name: string, isEditable: boolean, isExist: boolean }> = ({ name, isEditable, isExist }) => {
    const [deleteService] = useMutation<deleteSupplierServiceResponse, deleteSupplierServiceInput>(DELETE_SUPPLIER_SERVICE)
    const [addService] = useMutation<addSupplierServiceResponse, addSupplierServiceInput>(ADD_SUPLIER_SERVICE)

    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = (item: string) => {
        setIsLoading(true)
        deleteService({
            variables: { deleteSupplierServiceInput: { services: item } },
        })
            .then(({ data }) => {
                setUserData({
                    ...userData,
                    services: data.deleteSupplierService.services,
                })
                setIsLoading(false)
            })
            .catch(() => {
                errorAlert('Something went wrong!')
                setIsLoading(true)
            })
    }

    const handleAdd = (item: string) => {
        addService({ variables: { addSupplierServiceInput: { services: [item] } } })
            .then(({ data }) => {
                setUserData({
                    ...userData,
                    services: data.addSupplierService.services
                })
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
                errorAlert('Somthing went wrong!')
            })
    }

    return (
        <span className={`${c.service} ${isLoading ? c.deleting : ''}`}>
            {name}
            {isEditable && <button style={isExist ? { transform: 'rotate(0)' } : {}} onClick={!isLoading && (isExist ? () => handleDelete(name) : () => handleAdd(name))}>
                {isExist ? '-' : '+'}
            </button>}
        </span>
    )
}

const Departments: FC = () => {
    const [updateDepartments] = useMutation<
        updateDepartmentsResponse,
        updateDepartmentsInput
    >(UPDATE_DEPARTMENTS)

    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const [isEditable, setIsEditable] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [values, setValues] = useState({
        Purser: userData.departments.includes('Purser'),
        Galley: userData.departments.includes('Galley'),
        Deck: userData.departments.includes('Deck'),
        Security: userData.departments.includes('Security'),
        Interior: userData.departments.includes('Interior'),
        Engineering: userData.departments.includes('Engineering'),
    })

    const deleteDep = (department: string) =>
        setValues((prev) => {
            return { ...prev, [department]: false }
        })

    const addDep = (department: string) =>
        setValues((prev) => {
            return { ...prev, [department]: true }
        })

    const handleSubmit = () => {
        setIsEditable(false)
        setIsPending(true)

        const departments = []

        for (const val in values) {
            if (values[val]) departments.push(val)
        }

        if (
            JSON.stringify(departments) === JSON.stringify(userData.departments)
        )
            return setIsPending(false)

        updateDepartments({
            variables: {
                changeUserInfoInput: {
                    departments,
                },
            },
        })
            .then(({ data }) => {
                setUserData({
                    ...userData,
                    departments: data.changeUserInfo.departments,
                })
                setIsPending(false)
            })
            .catch(() => {
                errorAlert()
                setIsPending(false)
            })
    }

    return (
        <div>
            <h4 className={c.title}>
                Departments
                <EditIcon
                    isOn={isEditable}
                    onClick={
                        isEditable
                            ? () => handleSubmit()
                            : () => setIsEditable(true)
                    }
                />
            </h4>
            <div
                style={isPending ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                className={c.departmets_list}>
                {!isEditable ? (
                    userData.departments.map((dep) => (
                        <>
                            <div key={dep} className={c.department}>
                                {dep}
                            </div>
                        </>
                    ))
                ) : (
                    <>
                        <div
                            className={`${c.department_edit} ${c.department}`}
                            onClick={
                                values.Purser
                                    ? () => deleteDep('Purser')
                                    : () => addDep('Purser')
                            }>
                            Purser
                            <div className={values.Purser ? c.delete : c.add}>
                                +
                            </div>
                        </div>
                        <div
                            className={`${c.department_edit} ${c.department}`}
                            onClick={
                                values.Galley
                                    ? () => deleteDep('Galley')
                                    : () => addDep('Galley')
                            }>
                            Galley
                            <div className={values.Galley ? c.delete : c.add}>
                                +
                            </div>
                        </div>
                        <div
                            className={`${c.department_edit} ${c.department}`}
                            onClick={
                                values.Deck
                                    ? () => deleteDep('Deck')
                                    : () => addDep('Deck')
                            }>
                            Deck
                            <div className={values.Deck ? c.delete : c.add}>
                                +
                            </div>
                        </div>
                        <div
                            className={`${c.department_edit} ${c.department}`}
                            onClick={
                                values.Security
                                    ? () => deleteDep('Security')
                                    : () => addDep('Security')
                            }>
                            Security
                            <div className={values.Security ? c.delete : c.add}>
                                +
                            </div>
                        </div>
                        <div
                            className={`${c.department_edit} ${c.department}`}
                            onClick={
                                values.Interior
                                    ? () => deleteDep('Interior')
                                    : () => addDep('Interior')
                            }>
                            Interior
                            <div className={values.Interior ? c.delete : c.add}>
                                +
                            </div>
                        </div>
                        <div
                            className={`${c.department_edit} ${c.department}`}
                            onClick={
                                values.Engineering
                                    ? () => deleteDep('Engineering')
                                    : () => addDep('Engineering')
                            }>
                            Engineering
                            <div
                                className={
                                    values.Engineering ? c.delete : c.add
                                }>
                                +
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

const Teammates: FC = () => {
    const userData = useAuthStore((state) => state.userData)
    const popup = useTeamMatesPopupStore()

    return (
        <div>
            <h4 className={c.title}>
                Teammates
                <EditIcon
                    isOn={popup.isOpened}
                    onClick={() => popup.setIsOpened(true)}
                />
            </h4>
            <span className={c.lil_span}>Add/Change</span>
            <div className={c.teammates_list}>
                {userData.teamMates.map((item) => (
                    <img
                        key={item._id}
                        title={item._id}
                        className={c.teammate}
                        src={
                            item.avatarURL
                                ? item.avatarURL
                                : process.env.NEXT_PUBLIC_AVATAR_ERROR
                        }
                        alt={item._id}
                        onClick={() => popup.setIsOpened(true)}
                    />
                ))}
            </div>
        </div>
    )
}

const FavouriteSuppliers: FC = () => {
    const userData = useAuthStore((state) => state.userData)
    const popup = useFavoriteSuppliersPopupStore()

    const favoriteSuppliers = [].concat(...userData.favoriteSuppliers.map((obj) => obj.id))

    return (
        favoriteSuppliers.length > 0 && <div>
            <h4 className={c.title}>
                Favourite Suppliers{' '}
                <EditIcon
                    isOn={popup.isOpened}
                    onClick={() => popup.setIsOpened(true)}
                />
            </h4>
            <span className={c.lil_span}>Add/Change</span>
            <div className={c.teammates_list}>
                {favoriteSuppliers.map((item) => (
                    <img onClick={() => popup.setIsOpened(true)}
                        key={item._id}
                        title={item.userName}
                        className={c.teammate}
                        src={
                            item.avatarURL
                                ? item.avatarURL
                                : process.env.NEXT_PUBLIC_AVATAR_ERROR
                        }
                        alt={item._id}
                    />
                ))}
            </div>
        </div>
    )
}