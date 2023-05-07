import React from "react"

function Modal(props) {

    const { setShowMethod } = props

    const modalOff = () => {
        setShowMethod(false)
    }

    const modalOn = () => {
        setShowMethod(true)
    }


    return (
        <div className="Modal" onClick={modalOff}>
            <div className="modal-info" onClick={modalOn} >
                <a onClick={modalOff}>
                    <svg className="closer" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                </a>
                <h4>Methodology</h4>
                <ul>
                    <li>Crash data is reported by local law enforcement, aggregated at the state level by the Indiana State Police and then sent back to county officials. Map data includes all reported crashes in Monroe County from 2003 to 2022.
                    </li>
                    <li>Fatalities and injuries are estimated for years 2003 to 2012, because those years were reported through a different system. A fatality or injury of one for a crash prior to 2013 means there was at least one reported fatality or injury.
                    </li>
                    <li>Crashes in the database only include those that were reported to law enforcement. Most often, this means that law enforcement was at the scene or that people involved in the crash notified law enforcement afterward for insurance purposes. This means that many minor crashes are not accounted for in the data.
                    </li>
                    <li>Street addresses input by police often include typos or mistakes. Latitude and longitude data in the public dataset is also often incorrect as a result. The IDS cleaned the crash data to improve the accuracy of the addresses and the locations of the dots, but there are still errors in the map. The intersection listed when hovering over a crash dot is the most accurate way to see where the original crash was, rather than the actual location of the dot on the map.
                    </li>
                    <li>Overlapping crash dots have been moved slightly to allow them to be seen on the map. This means that the location of each dot is not exactly where the crash occurred, but is still within a few meters of the original intersection.
                    </li>
                    <li>Base data is from the Bloomington open data portal, which provides crash data from 2003 to 2021 and partial data for 2022. The Bloomington Planning and Transportation Department provided the full dataset for 2022 and data for crashes that involved cyclists or pedestrians.
                    </li>
                    <li>Pedestrian and cyclist crashes are more likely to be underreported, according to city officials. This is because collisions between vehicles are more likely to result in material damage that is reported to law enforcement for insurance purposes.
                    </li>
                </ul>
                <p><em>Special thanks to YY Ahn, Mike Stewart, Vivien Ngo and Mark Stosberg for their expertise and help on the data cleaning and map.
                </em></p>
            </div>
        </div>
    )
}

export default Modal;


