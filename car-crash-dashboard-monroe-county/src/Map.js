import React, { useState, useEffect, useRef } from "react";
import Splash from './Splash.js'
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function Map(props) {
    const {
        fatalData,
        speedVisibility,
        showDeaths,
        showInjuries,
        showMinorCrashes,
        showBikePedOnly,
        years
    } = props

    // used to render the map
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const pointColor = "yellow" // non-fatal crash color
    const pointColorDeath = "red" // fatal crash color
    const pointColorInjury = "orange" // injury-only crash color

    useEffect(() => {

        // colormap for speed limit lines
        const speedCmap = ["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"]

        // fix for making mapbox work with react app
        // uncomment for deployment:
        // mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

        /* 
            INITIALIZE MAP
        */
        const initializeMap = ({ setMap, mapContainer }) => {

            // instantiate the map
            const map = new mapboxgl.Map({
                container: mapContainer.current, // it will know where to put the map based on the mapContainer ref
                // style: 'mapbox://styles/cterbush/clfyfv364003s01o4xuofdpp3',
                style: 'mapbox://styles/ids-digital-desk/clh5rs3pv01f101qj904jb8fv',
                center: [-86.52702437238956, 39.1656613635316], // center it over Bloomington
                zoom: 12.5, // default zoom
                maxzoom: 22,
                worldCopyJump: true, // fix for react
                maxBounds: [ // prevent panning too far from Bloomington
                    [-86.87628, 38.86386], // Southwest coordinates
                    [-86.18347, 39.48197] // Northeast coordinates
                ]
            }).addControl( // add geocoder to enable search
                new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl,
                    collapsed: true
                })
            ).addControl(new mapboxgl.NavigationControl({ // Add zoom and rotation controls to the map.
                showCompass: false
            }), 'bottom-right')

            map.on("load", () => {
                setMap(map)
                map.resize()

                /*
                    ADD DATA SOURCES
                */
                // crash data points 
                // map.addSource('crash-data-source', {
                //     // 'type': 'vector',
                //     // url: 'mapbox://cterbush.asrfcark',
                // })
                map.addSource('injury-crash-source', {
                    // 'type': 'geojson',
                    // 'data': injuryData
                    'type': 'vector',
                    url: 'mapbox://ids-digital-desk.0d949gv4'
                })
                map.addSource('other-crash-source', {
                    // 'type': 'geojson',
                    // 'data': otherData
                    type: 'vector',
                    url: 'mapbox://ids-digital-desk.drbt4bz6'
                })
                // fatal crashes
                map.addSource('fatal-crash-source', {
                    'type': 'geojson',
                    'data': fatalData
                })
                // speed limits
                map.addSource('speed-limits', {
                    'type': 'vector',
                    // url: 'mapbox://cterbush.5608sxsh'
                    url: 'mapbox://ids-digital-desk.2jqddygl'
                })

                const labelLayer = 'road-label' // id of label layer, to make sure this is still above all layers rendered below

                /*
                    ADD LAYERS + STYLING
                */

                map.addLayer({ // speed limits
                    'id': 'speed-limit-lines',
                    'type': 'line',
                    'source': 'speed-limits',
                    'source-layer': 'speed-limits-7w7yya',
                    'layout': {
                        visibility: 'visible', // show initially
                    },
                    'paint': {
                        'line-color': {
                            property: 's', // 's' property == speed limit
                            stops: [
                                // set colors based on the cmap defined above
                                [16, speedCmap[4]], // speed limit <= 16
                                [20, speedCmap[3]], // speed limit 20, 25
                                [30, speedCmap[2]], // speed limit 30, 35
                                [40, speedCmap[1]], // speed limit 40, 45
                                [55, speedCmap[0]], // speed limit 55 or above
                            ]
                        },
                        'line-width': ['interpolate', ['linear'], ['zoom'],
                            // at zoom level 10 => .5px
                            10, 1,
                            // at zoom level 12
                            12, 1,
                            14, 2,
                            // at zoom level 20
                            20, 15
                        ],
                        'line-opacity': .5
                    }
                }, labelLayer) // below label layer

                // set up point radius based on zoom for each of the point layers below
                const point_radius = ['interpolate', ['linear'], ['zoom'],
                    // at zoom level 10 => 1 px
                    10, 1,
                    // at zoom level 12 => 1.5 px
                    12, 1.5,
                    14, 3,
                    // at zoom level 20 => 20 px
                    20, 10
                ]

                map.addLayer({ // crashes with no injuries or deaths
                    id: 'points-other',
                    type: 'circle',
                    source: 'other-crash-source',
                    'source-layer': 'master-nonfatal-dvddiu',
                    layout: {
                        visibility: 'visible',
                    },
                    paint: {
                        'circle-color': pointColor,
                        'circle-radius': point_radius,
                        // no stroke
                        'circle-stroke-width': 0,
                        'circle-opacity': .3
                    },
                }, labelLayer) // below label layer

                map.addLayer({ // crashes with injuries only
                    id: 'points-injuries',
                    type: 'circle',
                    source: 'injury-crash-source',
                    'source-layer': 'master-injuries-3bg8n9',
                    layout: {
                        visibility: 'visible',
                    },
                    paint: {
                        'circle-color': pointColorInjury,
                        'circle-radius': point_radius,
                        // no stroke
                        'circle-stroke-width': 0,
                        'circle-opacity': .8
                    },
                }, labelLayer)

                map.addLayer({ // fatal crashes
                    id: 'points-death',
                    type: 'circle',
                    source: 'fatal-crash-source',
                    layout: {
                        visibility: 'visible',
                    },
                    paint: {
                        'circle-color': pointColorDeath,
                        // make deaths 1.5x bigger so they're more visible
                        'circle-radius': ['interpolate', ['linear'], ['zoom'],
                            // at zoom level 10 => 1 px
                            10, 1.5,
                            // at zoom level 12 => 1.5 px
                            12, 3,
                            14, 6,
                            // at zoom level 20 => 20 px
                            20, 20
                        ],
                        // no stroke
                        'circle-stroke-width': 0,
                        'circle-opacity': 1
                    },
                }, labelLayer)



            })
        }

        // if the map hasn't rendered yet and we have all our data loaded, render it
        if (!map && fatalData.features.length > 0) initializeMap({ setMap, mapContainer });

    }, [map, fatalData.features.length]);

    /*
        POPUPS & HOVER EFFECTS
    */
    useEffect(() => {

        if (map) { // once the map has rendered
            // Create a popup, but don't add it to the map yet.
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
                className: 'popup'
            })

            // function to show the pop up on each points layer
            const popupFunction = (e) => {
                map.getCanvas().style.cursor = 'pointer' // change cursor when hovering

                const hoveredPoint = e.features[0]

                const coordinates = hoveredPoint.geometry.coordinates.slice() // get coords
                const primaryFactor = hoveredPoint.properties.f // get primary factor
                const date = hoveredPoint.properties.dt // get date
                let deaths = hoveredPoint.properties.d ? hoveredPoint.properties.d : 0
                let injuries = hoveredPoint.properties.i ? hoveredPoint.properties.i : 0
                const mannerOfCollision = hoveredPoint.properties.m
                const road1 = hoveredPoint.properties['r'] // Roadway Id
                const road2 = hoveredPoint.properties['r2'] // Intersecting Road
                const pedestrians = hoveredPoint.properties['p'] ? hoveredPoint.properties['p'] : false // If pedestrians involved in crash
                const cyclists = hoveredPoint.properties['c'] ? hoveredPoint.properties['c'] : false  // If cyclists involved in crash
                const vehicles = hoveredPoint.properties['v'] // Num vehicles involved in crash

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // create popup contents based on the data extracted above
                let popupHTML = `
                            <div class="tooltip">
                                <p style=font-size:1.5em;margin-bottom:0;><strong>${road1}${road2 ? ' & ' + road2 : ''}</strong></p>
                                <p style=color:var(--darkgray);margin-top:.2em;margin-bottom:0;>${new Date(date).toLocaleDateString('en-us', { hour: "numeric", year: "numeric", month: "short", day: "numeric" })}</p>
                                <p style=margin-bottom:0;><strong>Primary factor:</strong> ${primaryFactor ? primaryFactor.charAt(0).toUpperCase() + primaryFactor.slice(1).toLowerCase() : 'Not listed'}</p>
                                <p style=margin-bottom:0;><strong>Type of collision:</strong> ${mannerOfCollision ? mannerOfCollision.charAt(0).toUpperCase() + mannerOfCollision.slice(1).toLowerCase() : 'Not listed'}</p>
                                <table>
                                    <tr>
                                        <th>Deaths</th>
                                        <td>${deaths}</td>
                                    </tr>
                                    <tr>
                                        <th>Injuries</th>
                                        <td>${injuries}</td>
                                    </tr>
                                    <tr>
                                        <th>Pedestrians involved</th>
                                        <td>${pedestrians ? "Yes" : 'No'}</td>
                                    </tr>
                                    <tr>
                                        <th>Cyclists involved</th>
                                        <td>${cyclists ? "Yes" : 'No'}</td>
                                    </tr>
                                    <tr>
                                        <th>Vehicles involved</th>
                                        <td>${vehicles ? vehicles : 'Unknown'}</td>
                                    </tr>
                                </table>
                            </div>
                            `

                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.setLngLat(coordinates).setHTML(popupHTML).addTo(map);
            }

            const popupRemove = () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            }

            // apply popup function to all points layers
            const pointLayers = ['points-death',
                'points-injuries',
                'points-other']
            pointLayers.forEach((id) => {
                map.on('mouseenter', id, (e) => { popupFunction(e, id) })
                map.on('mouseleave', id, popupRemove)
            })

        }

    }, [map])

    useEffect(() => { // hide/show speed limits
        if (map) {
            map.setLayoutProperty('speed-limit-lines', 'visibility', speedVisibility ? 'visible' : 'none');
        }

    }, [speedVisibility, map])

    useEffect(() => {
        // apply year & bike/ped filters to all point layers
        const pointLayers = ['points-death',
            'points-injuries',
            'points-other']

        let yearFilter = []
        // iterate through the `years` state var, which is controlled by the years slider in the Controls menu
        // for each year, add a filtering string that can be added to the map layer
        years.forEach((year) => {
            yearFilter.push(['in', year.toString(), ['get', 'dt']])
        })
        if (map) {
            if (showBikePedOnly) {
                pointLayers.map((id) => map.setFilter(id, ['all',
                    ['any', ...yearFilter],
                    ['any', ['get', 'p'], ['get', 'c']]
                ]))
            }
            else {
                pointLayers.map((id) => map.setFilter(id, ['any', ...yearFilter]))
            }
        }
    }, [showBikePedOnly, years, map])

    useEffect(() => { // hide/show fatal crash points
        if (map) {
            map.setLayoutProperty('points-death', 'visibility', showDeaths ? 'visible' : 'none')
        }
    }, [showDeaths, map])

    useEffect(() => { // hide/show nonfatal crash points
        if (map) {
            map.setLayoutProperty('points-other', 'visibility', showMinorCrashes ? 'visible' : 'none');
        }
    }, [showMinorCrashes, map])

    useEffect(() => { // hide/show crash points with injuries
        if (map) {
            map.setLayoutProperty('points-injuries', 'visibility', showInjuries ? 'visible' : 'none');
        }
    }, [showInjuries, map])

    return (
        <>
            <div ref={mapContainer} className="mapContainerDiv" />
            {!map && <Splash />}
        </>
    )
}


export default Map