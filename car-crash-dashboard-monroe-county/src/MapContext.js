import React, { useState, useEffect } from "react"
import './App.css'
import Map from './Map.js'
import mapboxgl from 'mapbox-gl'
import useMobileDetect from 'use-mobile-detect-hook'

import death_data from './data/master-deaths.min.geojson'

function MapContext(props) {
    const {
        menuOpen,
        setMenuOpen,
        speedVisibility,
        showDeaths,
        showInjuries,
        showMinorCrashes,
        showBikePedOnly,
        years
    } = props

    const [fatalData, setFatalData] = useState({ type: 'FeatureCollection', features: [] })

    // check if the user is on mobile
    const detectMobile = useMobileDetect()
    // if the user clicks outside of the menu on mobile, turn off the menu
    const menuOff = () => {
        if (detectMobile.isMobile() && menuOpen) {
            setMenuOpen(false)
        }
    }

    useEffect(() => {
        fetch(death_data)
            .then(response => {
                return response.json();
            })
            .then(data => setFatalData(data));
    }, [])

    // ids-digital-desk mapbox account
    mapboxgl.accessToken = 'pk.eyJ1IjoiaWRzLWRpZ2l0YWwtZGVzayIsImEiOiJjbGg1cmh3ZHowMGNnM2RyeWJqcDBvc2o0In0.OJyucOQn4HIDhap19nVXHg'

    return (
        <div onClick={menuOff}>
            {fatalData && (
                <Map
                    fatalData={fatalData}
                    speedVisibility={speedVisibility}
                    showDeaths={showDeaths}
                    showInjuries={showInjuries}
                    showMinorCrashes={showMinorCrashes}
                    showBikePedOnly={showBikePedOnly}
                    years={years}
                />
            )}
        </div>
    )
}

export default MapContext;
