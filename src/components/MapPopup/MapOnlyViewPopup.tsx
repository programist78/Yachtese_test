import React, { useState } from 'react'
import c from './MapPopup.module.scss'
import Title from '../Title/Title'
import ReactMapGl, { Marker, ViewState } from 'react-map-gl'
import { mapProps } from '../../config/constants'
import Image from 'next/image'
import Geocode from 'react-geocode'
import 'mapbox-gl/dist/mapbox-gl.css'
import useMapOnlyViewStore from '../../stores/useMapOnlyViewStore'
import useYachtPageStore from '../../stores/useYachtPageStore'
import { MarkerType } from '../../stores/useAuthStore'

const MapOnlyViewPopup: React.FC = () => {
    const setIsOpened = useMapOnlyViewStore((state) => state.setIsOpened)
    const isOpened = useMapOnlyViewStore((state) => state.isOpened)

    const route = useYachtPageStore((state) => state.yachtData.yachtRoute)

    const [markers, setMarkers] = useState<
        Array<MarkerType & { unconfiremed?: true }>
    >(route)
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

    return (
        isOpened && (
            <div className={c.main} onClick={() => setIsOpened(false)}>
                <div
                    className={`${c.menu} container`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Title className={c.title}>Map</Title>
                    <ReactMapGl
                        {...viewport}
                        {...mapProps}
                        onDrag={(e) => setViewport(e.viewState)}
                        onZoom={(e) => setViewport(e.viewState)}
                        style={{
                            height: 600,
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
                </div>
            </div>
        )
    )
}

export default MapOnlyViewPopup
