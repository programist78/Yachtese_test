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
import { errorAlert } from '../../utils/alerts'
import {
    DELETE_SUPPLIER_SERVICE,
    deleteSupplierServiceInput,
    deleteSupplierServiceResponse,
} from '../../graphql/deleteSupplierService'
import {
    UPDATE_DEPARTMENTS,
    updateDepartmentsInput,
    updateDepartmentsResponse,
} from '../../graphql/updateDepartments'
import {
    UPDATE_LOCATION,
    updateLocationInput,
    updateLocationResponse,
} from '../../graphql/updateLocation'
import useTeamMatesPopupStore from '../../stores/useTeamMatesPopupStore'
import useYachtPageStore from '../../stores/useYachtPageStore'
import useSupplierPageStore from '../../stores/useSupplierPageStore'
import useFavoriteSuppliersPopupStore from '../../stores/useFavoriteSuppliersPopupStore'
import FavoriteSuppliersPopup from '../FavoriteSuppliersPopup/FavoriteSuppliersPopup'

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
        <Departments/>
        {userData.favoriteSuppliers.length > 0 && <FavouriteSuppliers/>}
        {userData.teamMates.length > 0 && <Teammates/>}
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
    const [updateLocation] = useMutation<
        updateLocationResponse,
        updateLocationInput
    >(UPDATE_LOCATION)

    const [isEditable, setIsEditable] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const userData = useAuthStore((state) => state.userData)
    const [place, setPlace] = useState('')
    const [placeInState, setPlaceInState] = useState('')
    const [_, startTransition] = useTransition()
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
        }, 300)

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
        if (error) return

        updateLocation({
            variables: {
                changeLocationInput: {
                    location: {
                        lat: pos.latitude,
                        lon: pos.longitude,
                        radius: Number(radius),
                    },
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
        </>
    )
}

const Services: FC = () => {
    const [addService] = useMutation<
        addSupplierServiceResponse,
        addSupplierServiceInput
    >(ADD_SUPLIER_SERVICE)

    const [isEditable, setIsEditable] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const services = useAuthStore((state) => state.userData.services)
    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const [input, setInput] = useState('')

    const handleSubmit = () => {
        if (isPending) return
        setIsPending(true)
        if (!input) return setIsEditable(false)

        addService({
            variables: { addSupplierServiceInput: { services: [input] } },
        })
            .then(({ data }) => {
                setUserData({
                    ...userData,
                    services: data.addSupplierService.services,
                })
                setIsPending(false)
                setIsEditable(false)
                setInput('')
            })
            .catch(() => {
                setIsEditable(false)
                setInput('')
                setIsPending(false)
                errorAlert('Somthing went wrong!')
            })
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsEditable(false)

                return setInput('')
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div className={c.space_top}>
            <h4 className={`${c.title} ${c.services_title}`}>
                All Services
                <EditIcon
                    isOn={isEditable}
                    onClick={
                        !isEditable
                            ? () => setIsEditable(true)
                            : () => handleSubmit()
                    }
                />
            </h4>
            {services.map((item) => (
                <Service key={item} name={item} />
            ))}
            {isEditable ? (
                <input
                    className={c.add_service_input}
                    value={input}
                    disabled={isPending}
                    onChange={(e) => setInput(e.target.value)}
                    onBlur={() => handleSubmit()}
                    placeholder='Cleaning'
                />
            ) : (
                <button
                    className={c.add_service}
                    onClick={() => setIsEditable(true)}>
                    Create Service
                </button>
            )}
        </div>
    )
}

const Service: FC<{ name: string }> = ({ name }) => {
    const [deleteService] = useMutation<
        deleteSupplierServiceResponse,
        deleteSupplierServiceInput
    >(DELETE_SUPPLIER_SERVICE)

    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = (item: string) => {
        setIsDeleting(true)
        deleteService({
            variables: { deleteSupplierServiceInput: { services: item } },
        })
            .then(({ data }) => {
                setUserData({
                    ...userData,
                    services: data.deleteSupplierService.services,
                })
                setIsDeleting(false)
            })
            .catch(() => {
                errorAlert('Something went wrong!')
                setIsDeleting(true)
            })
    }

    return (
        <span className={`${c.service} ${isDeleting ? c.deleting : ''}`}>
            {name}
            <button onClick={!isDeleting && (() => handleDelete(name))}>
                +
            </button>
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
        <div>
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