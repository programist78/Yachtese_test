import { FC } from 'react'
import c from './styles/Additional.module.scss'
import useAuthStore from '../../stores/useAuthStore'
import ReactMapGl, { Layer, Marker, Source } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapProps } from '../../config/constants'
import Image from 'next/image'
import useMapStore from '../../stores/useMapStore'
import { useMutation } from '@apollo/client'
import { DELETE_USER } from '../../graphql/deleteUser'
import { errorAlert, successAlert } from '../../utils/alerts'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { Review as ReviewType } from '../../graphql/getReviews'
import Stars from '../Stars/Stars'
import useReviewsStore from '../../stores/useReviewsStore'


export const SupplierAdditional: FC = () => {

    const subscription = useAuthStore((state) => state.userData.subscription)

    return <article className={`${c.main} block`}>
        <Email />
        {subscription.customerId && <Subscription />}
        <DeleteProfile />
    </article>
}

export const YachtAdditional: FC = () => {

    const userData = useAuthStore((state) => state.userData)

    return <article className={`${c.main} block`}>
        <Email />
        {userData.subscription.customerId && <Subscription />}
        <Routes />
        <Map />
        <DeleteProfile />
    </article>
}

export const YachtTeammateAdditional: FC = () => {
    return <article className={`${c.main} block`}>
        <Email />
        <Routes />
        <Map />
        <DeleteProfile />
    </article>
}

export const YachtBussinesAdditional: FC = () => {

    const subscription = useAuthStore((state) => state.userData.subscription)

    return <article className={`${c.main} block`}>
        <Email />
        {subscription.customerId && <Subscription />}
        <Routes />
        <DeleteProfile />
    </article>
}

export const SupplierViewAdditional: FC = () => {

    const reviews = useReviewsStore((state) => state.reviews)

    return reviews.length > 0 && <article className={`${c.main} block`}>
        <Reviews />
    </article>
}




const Email: FC = () => {

    const email = useAuthStore((state) => state.userData.email)

    return <>
        <h4 className={c.title}>Email</h4>
        <span className={c.email}>{email}</span>
    </>
}

const Subscription: FC = () => {

    const subscription = useAuthStore((state) => state.userData.subscription)

    return <div>

    </div>
}

const Map: FC = () => {

    const routes = useAuthStore((state) => state.userData.yachtRoute)
    const setIsOpened = useMapStore((state) => state.setIsOpened)

    return <div>
        <h4 className={c.title}>Map Route</h4>
        <div className={c.map_con}>
            <ReactMapGl onClick={() => setIsOpened(true)} {...mapProps} longitude={routes.length > 0 ? routes[0].lon : 0} latitude={routes.length > 0 ? routes[0].lat : 0} zoom={0} cursor='pointer'
                style={{ height: 300, width: '100%', borderRadius: 15, overflow: 'hidden' }}>
                {routes.map((item, index) => <Marker key={`Marker ${index}`} latitude={Number(item.lat)} longitude={Number(item.lon)} anchor='center'>
                    <div className='marker_con'><Image src='/assets/marker.png' alt={`#${index}`} width={20} height={30} /></div>
                </Marker>)}
                <Source id="polylineLayer" type="geojson" data={{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: routes.sort((a, b) => {
                            const dateA = new Date(a.time)
                            const dateB = new Date(b.time)

                            return Number(dateA) - Number(dateB)
                        }).map((item) => [item.lon, item.lat])
                    }
                }}>
                    <Layer type='line' />
                </Source>
            </ReactMapGl>
        </div>
    </div>
}

const DeleteProfile: FC = () => {

    const [deleteUser] = useMutation(DELETE_USER)
    const setUserData = useAuthStore((state) => state.setUserData)

    const handleClick = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to restore a deleted account.',
            cancelButtonColor: 'green',
            cancelButtonText: 'Cancel',
            confirmButtonColor: 'red',
            confirmButtonText: 'Delete',
            showCancelButton: true,
            icon: 'warning',
            background: '#171818',
            color: '#ffffff',
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                deleteUser().then(({ errors }) => {
                    if (errors) return errorAlert()
                    successAlert('Your profile deleted!')
                    Cookies.remove('token')
                    setUserData(null)
                }).catch(() => {
                    errorAlert()
                })
            }
        })
    }

    return <div className={c.delete_user}>
        <button onClick={handleClick}>Delete Account</button>
    </div>
}

const Routes: FC = () => {

    const userData = useAuthStore((state) => state.userData)
    const setIsOpened = useMapStore((state) => state.setIsOpened)

    const formatDateTime = (d) => {
        const date = new Date(d)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hours = date.getHours()
        const minutes = date.getMinutes()
      
        const formattedDate = `${(day < 10 ? '0' : '') + day}/${(month < 10 ? '0' : '') + month}/${year} ${(
          hours < 10 ? '0' : ''
        ) + hours}:${(minutes < 10 ? '0' : '') + minutes}`
      
        return formattedDate
      }

    return userData.yachtRoute && userData.yachtRoute.length > 0 && <div className={c.routes}>
        <h4 className={c.title}>Routes</h4>
        {userData.yachtRoute.map((item, i) => <div key={i} onClick={() => setIsOpened(true)}>
            <h5>{item.title}</h5>
            <span>{formatDateTime(item.time)}</span>
        </div>)}
    </div>
}

const Reviews: FC = () => {

    const reviews = useReviewsStore((state) => state.reviews)

    return <div>
        <h2 className={c.reviews_title}>Customer reviews</h2>
        {reviews.map((item) => <Review review={item} key={item._id} />)}
    </div>
}

const Review:FC<{ review:ReviewType }> = ({ review }) => {
    return <div className={c.review}>
        <div className={c.review_top}>
            {review.createdBy.userName}<Stars filled={review.rating} />
        </div>
        <p>{review.text}</p>
    </div>
}