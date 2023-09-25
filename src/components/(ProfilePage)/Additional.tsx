import { FC } from 'react'
import c from './styles/Additional.module.scss'
import useAuthStore from '../../stores/useAuthStore'
import ReactMapGl, { Layer, Marker, Source } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapProps } from '../../config/constants'
import Image from 'next/image'
import useMapStore from '../../stores/useMapStore'


export const SupplierAdditional: FC = () => {

    const subscription = useAuthStore((state) => state.userData.subscription)

    return <article className={`${c.main} block`}>
        <Email />
        {subscription.customerId && <Subscription />}
    </article>
}

export const YachtAdditional: FC = () => {

    const userData = useAuthStore((state) => state.userData)

    return <article className={`${c.main} block`}>
        <Email />
        {userData.subscription.customerId && <Subscription />}
        <Map />
    </article>
}

export const YachtTeammateAdditional: FC = () => {
    return <article className={`${c.main} block`}>
        <Email />
        <Map />
    </article>
}

export const YachtBussinesAdditional: FC = () => {

    const subscription = useAuthStore((state) => state.userData.subscription)

    return <article className={`${c.main} block`}>
        <Email />
        {subscription.customerId && <Subscription />}
        <Map />
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
                                  }).map((item) => [ item.lon, item.lat ])
                            }
                        }}>
                            <Layer type='line' />
                        </Source>
            </ReactMapGl>
        </div>
    </div>
}