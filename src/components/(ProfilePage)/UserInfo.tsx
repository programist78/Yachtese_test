import { FC, useEffect, useState } from 'react'
import ImageError from '../../utils/ImageError'
import useAuthStore from '../../stores/useAuthStore'
import EditIcon from '../EditIcon/EditIcon'
import c from './styles/UserInfo.module.scss'
import { useMutation } from '@apollo/client'
import { UPDATE_USER_NAME, updateUserMuatationInputType, updateUserMuatationResponseType } from '../../graphql/updataUserName'
import { errorAlert, successAlert } from '../../utils/alerts'
import Link from 'next/link'
import { RootURLsEnum } from '../../config/constants'
import useYachtPageStore from '../../stores/useYachtPageStore'
import instans from '../../config/axios'
import useSupplierPageStore from '../../stores/useSupplierPageStore'
import getLocalTime, { formatLocalTime } from '../../utils/getLocalTime'
import Geocode from 'react-geocode'


const UserInfo: FC = () => {

    const [updateName] = useMutation<updateUserMuatationResponseType, updateUserMuatationInputType>(UPDATE_USER_NAME)

    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)
    const [input, setInput] = useState(userData.userName)
    const [isEditable, setIsEditable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [localTime, setLocalTime] = useState<Date | null>(null)
    const [location, setLocation] = useState(null)

    useEffect(() => {
        if (!userData.location || !userData.location.lat) return
        getLocalTime(userData.location).then((res) => {
            if (res) setLocalTime(new Date(res))
        })

        Geocode.fromLatLng(
            userData.location.lat,
            userData.location.lon,
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        ).then((res) => {
            setLocation(
                res.results[Math.round(res.results.length / 2)]
                    .formatted_address,
            )
        }).catch(() => { })
    }, [userData.location])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!localTime) return
            setLocalTime((prev) => {
                const date = new Date(prev.getTime() + 10000)

                return date
            })
        }, 10000)

        return () => clearInterval(intervalId)
    }, [localTime])

    const handleClick = () => {
        if (!input || input === userData.userName) return setIsEditable(false)
        setIsEditable(false)
        setIsLoading(true)
        updateName({
            variables: {
                changeUserInfoInput: {
                    userName: input
                }
            }
        }).then(({ data }) => {
            setIsLoading(false)
            setUserData({ ...userData, userName: data.changeUserInfo.userName })
        }).catch(() => {
            errorAlert('Somthing went wrong!')
            setIsEditable(false)
        })
    }

    return <article className={'block'}>
        <div className={c.user_info}>
            <div className={c.image_con}>
                <ImageError alt={userData.userName} src={userData.avatarURL} className={c.avatar} />
                <label htmlFor='photo_input'><EditIcon isOn={false} onClick={() => { }} className={c.edit_photo} /></label>
                <input type='file' id='photo_input' className={c.input_photo} onChange={(e) => {
                    if (!e.target.files[0]) return
                    const formData = new FormData()

                    formData.append('avatar', e.target.files[0])

                    instans.post('avatar', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        window.location.reload()
                    }).catch((err) => {
                        errorAlert()
                    })
                }} />
            </div>
            <div className={c.con}>
                <div className={c.name}>
                    {!isEditable
                        ? <>
                            <h2>{isLoading ? 'Loading...' : userData.userName}</h2>
                            <EditIcon isOn={isEditable} onClick={() => setIsEditable(true)} />
                        </>
                        : <>
                            <input className={c.input} value={input} placeholder={userData.userName} onChange={(e) => setInput(e.target.value)} />
                            <EditIcon isOn={isEditable} onClick={handleClick} />
                        </>}
                </div>
                <span className={c.location}>{location && localTime && formatLocalTime(location, localTime)}</span>
            </div>
        </div>
        <div className={c.btns}>
            <Link className={c.pursepal} href={'#'}>Pursepal Coming Soon!</Link>
            <Link className={c.messages} href={RootURLsEnum.messages}>Messages</Link>
        </div>
    </article>
}


export const YachtInfo: FC = () => {

    const yachtData = useYachtPageStore((state) => state.yachtData)

    return <article className={'block'}>
        <div className={c.user_info_view}>
            <ImageError alt={yachtData.userName} src={yachtData.avatarURL} className={c.avatar} />
            <div className={c.con}>
                <div className={c.name}>
                    <h2>{yachtData.userName}</h2>
                </div>
            </div>
        </div>
        <div className={c.btns}>
            <Link className={c.pursepal} href={`${RootURLsEnum.messages}/${yachtData._id}new`}>Write Message</Link>
        </div>
    </article>
}

export const SupplierUserInfo: FC = () => {

    const supplierData = useSupplierPageStore((state) => state.supplierData)
    const _id = useAuthStore((state) => state.userData._id)
    const [localTime, setLocalTime] = useState<Date | null>(null)
    const [location, setLocation] = useState(null)

    useEffect(() => {
        if (!supplierData.location || !supplierData.location.lat) return
        getLocalTime(supplierData.location).then((res) => {
            if (res) setLocalTime(new Date(res))
        })

        Geocode.fromLatLng(
            supplierData.location.lat,
            supplierData.location.lon,
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        ).then((res) => {
            setLocation(
                res.results[Math.round(res.results.length / 2)]
                    .formatted_address,
            )
        }).catch(() => { })
    }, [supplierData.location])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!localTime) return
            setLocalTime((prev) => {
                const date = new Date(prev.getTime() + 10000)

                return date
            })
        }, 10000)

        return () => clearInterval(intervalId)
    }, [localTime])

    return <article className={'block'}>
        <div className={c.user_info_view}>
            <ImageError alt={supplierData.userName} src={supplierData.avatarURL} className={c.avatar} />
            <div className={c.con}>
                <div className={c.name}>
                    <h2 style={{ maxWidth: '90%' }}>{supplierData.userName}</h2>
                </div>
                <span className={c.location}>{location && localTime && formatLocalTime(location, localTime)}</span>
            </div>
        </div>
        <div className={c.btns}>
            <Link className={c.pursepal} href={supplierData._id == _id ? RootURLsEnum.profile : `${RootURLsEnum.messages}/${supplierData._id}new`}>Write Message</Link>
        </div>
    </article>
}

export default UserInfo
