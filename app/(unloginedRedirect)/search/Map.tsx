'use client'

import { FC, useEffect } from 'react'
import MapCircle from 'mapbox-gl-circle'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import c from './Search.module.scss'

const MapboxMap: FC<{
    suppliers: Array<{
        _id: string
        userName: string
        location: {
            lat: string
            lon: string
            radius: string
        }
    }>
}> = ({ suppliers }) => {

    useEffect(() => {
        if (!window) return
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

        const initializeMap = () => {
            const mapInstance = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/navigation-night-v1',
                center: [0, 0],
                zoom: 1.5,
            })

            mapInstance.on('load', () => {
                mapInstance.addSource('markers', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: suppliers.filter((item) => item.location !== null).map((item) => ({
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [+item.location.lon, +item.location.lat]
                            },
                            properties: {
                                title: item.userName
                            }
                        })),
                    },
                })

                mapInstance.addLayer({
                    id: 'markers',
                    type: 'symbol',
                    source: 'markers',
                    layout: {
                        'icon-image': 'marker-15',
                        'icon-size': 1.5,
                        'text-field': ['get', 'title'],
                        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                        'text-offset': [0, 0.6],
                        'text-anchor': 'top',
                        'text-size': 14,
                    },
                    paint: {
                        'text-color': '#FFFFFF',
                    }
                })
            })

            const search = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })

            if(typeof window !== 'undefined') {
                suppliers.filter((item) => item.location !== null).map((supplier) => {
                    new MapCircle({ lat: +supplier.location.lat, lng: +supplier.location.lon }, (supplier.location.radius ? +supplier.location.radius * 1000 : 100), {
                        fillColor: '#bfbfbf'
                    }).addTo(mapInstance)
                })
    
                mapInstance.addControl(search)
                mapInstance.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
            }
        }

        initializeMap()
    }, [suppliers])

    return (
        <div className={`${c.main} container`}>
            <div
                id='map'
                style={{ width: '100%', height: '60vh', borderRadius: 15, overflow: 'hidden' }}
            ></div>
        </div>
    )
}

export default MapboxMap