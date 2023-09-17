import React, { useState } from 'react'
import c from './MapPopup.module.scss'
import useMapStore from '../../stores/useMapStore'
import Title from '../Title/Title'
import ReactMapGl, { Marker, ViewState } from 'react-map-gl'
import useAuthStore, { MarkerType } from '../../stores/useAuthStore'
import { mapProps } from '../../config/constants'
import Image from 'next/image'
import Geocode from 'react-geocode'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useMutation } from '@apollo/client'
import { CHANGE_YACHT_ROUTE, changeYachtRouteInput, changeYachtRouteResponse } from '../../graphql/changeYachtRoute'
import { errorAlert, successAlert } from '../../utils/alerts'

const MapPopup: React.FC = () => {
    const [updateRoute] = useMutation<changeYachtRouteResponse, changeYachtRouteInput>(CHANGE_YACHT_ROUTE)

    const setIsOpened = useMapStore((state) => state.setIsOpened)
    const isOpened = useMapStore((state) => state.isOpened)

    const userData = useAuthStore((state) => state.userData)
    const setUserData = useAuthStore((state) => state.setUserData)

    const [markers, setMarkers] = useState<Array<MarkerType & { time: string | null }>>(userData.yachtRoute.map((item) => ({...item, time: new Date(item.time).toISOString().slice(0, 16)})))
    const [viewport, setViewport] = useState<ViewState>({
        bearing: 0,
        latitude: Number(markers.length > 0 ? markers[0].lat : 0),
        longitude: Number(markers.length > 0 ? markers[0].lon : 0),
        padding: {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        },
        pitch: 0,
        zoom: 2.5,
    })

    const handleSubmit = () => {
        if(!markers.every((item) => item.time !== null)) return errorAlert('All markers must have time')
        updateRoute({
            variables: {
                yachtRoutesInput: {
                    yachtRoute:markers.map((item) => ({
                        lat: item.lat,
                        lon: item.lon,
                        status: false,
                        time: item.time,
                        title: item.title
                    }))
                }
            }
        }).then(({data}) => {
            if(!data) return errorAlert()
            setUserData({...userData, yachtRoute: data.changeAllYachtRoutes.yachtRoute})
            successAlert('Yacht route updated!')
        }).catch(() => errorAlert())
    }

    return (
        isOpened && (
            <div className={c.main} onClick={() => setIsOpened(false)}>
                <div
                    className={`${c.menu} container`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Title className={c.title}>How It Works</Title>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean pharetra sit amet tortor ut auctor. Nullam
                        fermentum at lorem eget rhoncus. Quisque sit amet justo
                        a lorem cursus dictum id ut neque.
                    </span>
                    <ReactMapGl
                        {...viewport}
                        {...mapProps}
                        onDrag={(e) => setViewport(e.viewState)}
                        onZoom={(e) => setViewport(e.viewState)}
                        onDblClick={(e) => {
                            Geocode.fromLatLng(
                                `${e.lngLat.lat}`,
                                `${e.lngLat.lng}`,
                                process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
                            ).then((res) => {
                                setMarkers((prev) => [
                                    ...prev,
                                    {
                                        lat: e.lngLat.lat,
                                        lon: e.lngLat.lng,
                                        time: null,
                                        status: false,
                                        title: res.results[
                                            res.results.length > 1 ? Math.round(res.results.length / 2) : 0
                                        ].formatted_address,
                                        unconfiremed: true,
                                    },
                                ])
                            })
                        }}
                        style={{
                            height: 400,
                            width: '100%',
                            borderRadius: 15,
                            overflow: 'hidden',
                        }}
                    >
                        {markers.length > 0 &&
                            markers.map((item, index) => (
                                <Marker
                                    key={`Marker ${index}`}
                                    onClick={() =>
                                        setMarkers((prev) =>
                                            prev.filter((i) => i !== item),
                                        )
                                    }
                                    latitude={Number(item.lat)}
                                    longitude={Number(item.lon)}
                                    anchor='center'
                                >
                                    <div className='marker_con'>
                                        <Image
                                            src='/assets/marker.png'
                                            alt={`#${index}`}
                                            width={20}
                                            height={30}
                                        />
                                    </div>
                                </Marker>
                            ))}
                    </ReactMapGl>
                    <div className={c.inputs}>
                        {markers.length > 0 &&
                            markers.map((item, index) => (
                                <div
                                    key={`${item.title}${index}`}
                                    className={c.route}
                                >
                                    <>
                                        <input
                                            className={c.input}
                                            type='datetime-local'
                                            placeholder='Time'
                                            value={markers[index].time}
                                            onChange={(e) => setMarkers((prev) => {
                                                const newArray = [...prev]

                                                newArray[index].time = e.target.value

                                                return newArray
                                            })}
                                        />
                                        <input
                                            className={c.input}
                                            type='text'
                                            value={item.title}
                                            readOnly
                                        />
                                    </>
                                </div>
                            ))}
                        <button onClick={handleSubmit} className={c.submit}>Save</button>
                    </div>
                </div>
            </div>
        )
    )
}

export default MapPopup
