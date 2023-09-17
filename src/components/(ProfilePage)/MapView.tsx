import Image from 'next/image'
import { FC } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import useYachtPageStore from '../../stores/useYachtPageStore'
import { mapProps } from '../../config/constants'
import c from './styles/Additional.module.scss'
import useMapOnlyViewStore from '../../stores/useMapOnlyViewStore'

const MapView: FC = () => {
    const routes = useYachtPageStore((state) => state.yachtData.yachtRoute)
    const setIsOpened = useMapOnlyViewStore((state) => state.setIsOpened)

    return (
        <div className={`block ${c.map_onlyview}`}>
            <h4 className={c.title}>Map Route</h4>
            <div className={c.map_con}>
                <ReactMapGl
                    onClick={() => {
                        setIsOpened(true)
                    }}
                    {...mapProps}
                    longitude={routes.length > 0 ? +routes[0].lon : 0}
                    latitude={routes.length > 0 ? +routes[0].lat : 0}
                    zoom={0}
                    cursor='pointer'
                    style={{
                        height: 300,
                        width: '100%',
                        borderRadius: 15,
                        overflow: 'hidden',
                    }}>
                    {routes.map((item, index) => (
                        <Marker
                            key={`Marker ${index}`}
                            latitude={Number(item.lat)}
                            longitude={Number(item.lon)}
                            anchor='center'>
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
}

export default MapView
