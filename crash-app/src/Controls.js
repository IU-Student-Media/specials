import React from "react"
import './App.css'
import ControlButton from './ControlButton.js'
import useMobileDetect from 'use-mobile-detect-hook'
import { useWindowWidth } from '@react-hook/window-size'

function Controls(props) {
    const {
        menuOpen,
        setMenuOpen,
        showMethod,
        setShowMethod,
        speedVisibility,
        setSpeedVisibility,
        showDeaths,
        setShowDeaths,
        showInjuries,
        setShowInjuries,
        showMinorCrashes,
        setShowMinorCrashes,
        showBikePedOnly,
        setShowBikePedOnly,
        years,
        setYears
    } = props

    // check if the user is on mobile
    const detectMobile = useMobileDetect()

    const windowWidth = useWindowWidth()

    const speedCmap = ["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"]
    const speedStops = ['55+', '40-45', '30-35', '20-25', '15 or less']

    const pointData = [
        {
            color: 'red',
            label: 'Fatal crash',
            flag: showDeaths,
            setFlag: setShowDeaths
        },
        {
            color: 'orange',
            label: 'Crash involving injury',
            flag: showInjuries,
            setFlag: setShowInjuries
        },
        {
            color: 'yellow',
            label: 'No injuries or deaths',
            flag: showMinorCrashes,
            setFlag: setShowMinorCrashes
        }
    ]

    const menuOff = () => {
        setMenuOpen(false)
    }

    const methodOn = () => {
        setShowMethod(true)
    }

    return (
        <div className="Controls" style={{
            width: menuOpen ? detectMobile.isMobile() ? windowWidth * .8 : '250px' : 0,
        }}>
            <div className="controls-inner" style={{
                minWidth: detectMobile.isMobile() ? windowWidth * .8 - 30 : '220px'
            }}>
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <svg className="logo" viewBox="0 0 163.17 68.85">
                            <path d="M0,67.77V1.08H19.89V67.77Z" />
                            <path
                                d="M32.85,67.77V1.08H58.32c19.44,0,38.34,6.21,38.34,33.3,0,26.64-20.07,33.39-39.6,33.39ZM52.74,50.4h5.85c12.06,0,17.91-4.41,17.91-16s-5.67-15.3-18.81-15.3H52.74Z" />
                            <path
                                d="M98.82,59l9.54-13.59c6.66,4.59,15.93,7,23.31,7,9.45,0,11.7-2.16,11.7-4.86s-2.7-3.78-12.51-4.59c-14.31-1.17-28.26-4.86-28.26-21.15C102.6,5.67,115.83,0,131,0c15.84,0,24.48,4.05,29.16,7.83l-9.9,14.31c-3.78-2.52-12.33-4.77-19-4.77s-8.73,1.08-8.73,3.69c0,3.24,2.79,4.05,12.69,4.86,14.94,1.26,28,4.14,28,20.7,0,13.5-11.52,22.23-30.87,22.23C114.66,68.85,105.84,64.53,98.82,59Z" />
                        </svg>
                        <a onClick={menuOff}>
                            <svg className="closer" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </a>
                    </div>


                    <h1>Monroe County Crash Dashboard</h1>
                    <p><em><a href="#" onClick={methodOn} >About the data</a></em></p>

                    <div style={{
                        maxWidth: 220
                    }}>
                        <ControlButton
                            type="year-filter"
                            textOn="Year"
                            textOff="Year"
                            flag={years}
                            setFlag={setYears}
                        />
                    </div>

                    <hr />

                    {pointData.map((d, i) => {
                        return (
                            <div key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                <div style={{ display: "flex", jusitfyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{
                                        height: '15px',
                                        width: '15px',
                                        backgroundColor: d.color,
                                        borderRadius: '50%',
                                        // opacity: .5,
                                        marginRight: '8px'
                                    }} />
                                    <label>
                                        <span>{d.label}</span>
                                    </label>
                                </div>
                                <ControlButton
                                    type="toggle"
                                    textOn=""
                                    flag={d.flag}
                                    setFlag={d.setFlag}
                                />
                            </div>
                        )
                    })}
                    <hr />

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '12px'
                    }}>
                        <div style={{ display: "flex", jusitfyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                            <label>
                                <span>Only show crashes involving <strong>pedestrians</strong> or <strong>cyclists</strong></span>
                            </label>
                        </div>
                        <ControlButton
                            type="toggle"
                            textOn=""
                            flag={showBikePedOnly}
                            setFlag={setShowBikePedOnly}
                        />
                    </div>

                    <hr />

                    <ControlButton
                        type="toggle"
                        textOn="Speed limits"
                        flag={speedVisibility}
                        setFlag={setSpeedVisibility}
                    />
                    {speedVisibility && (<span className="small-label">2022 data</span>)}
                    {speedVisibility && speedCmap.map((color, i) => {
                        return (
                            <>
                                <div key={i} style={{
                                    display: 'flex',
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        width: 45,
                                        height: 4,
                                        borderRadius: 2,
                                        backgroundColor: color,
                                        opacity: .8,
                                        marginRight: 5,
                                    }} />
                                    <span>{speedStops[i]} mph</span>
                                </div>
                            </>
                        )
                    })}

                </div>
                <p><strong>Source:</strong> <a href="https://github.com/ids-digi/moco-crash-data" target="_blank">IDS analysis</a> of <a href="https://data.bloomington.in.gov/dataset/traffic-data" target="_blank">Bloomington traffic data</a></p>
                <p><small>Map and analysis by <a href="https://www.idsnews.com/staff/Carson-TerBush" target="_blank">Carson TerBush</a></small></p>
            </div>
        </div >
    )
}

export default Controls;


