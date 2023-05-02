import React, { useState } from "react";
import './App.css';
import MapContext from './MapContext.js'
import Controls from './Controls.js'

function App() {

  // state variables to control map layers across whole app
  const [speedVisibility, setSpeedVisibility] = useState(true) // show/hide speed limits
  const [showDeaths, setShowDeaths] = useState(true) // show/hide fatal crashes
  const [showInjuries, setShowInjuries] = useState(true) // show/hide crashes w injuries
  const [showMinorCrashes, setShowMinorCrashes] = useState(true) // show/hide all others
  const [years, setYears] = useState([2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]) // set the years filter
  const [showBikePedOnly, setShowBikePedOnly] = useState(false)
  // if it's mobile, hide the menu on the first load
  const [menuOpen, setMenuOpen] = useState(true)

  const menuOn = () => { // show the controls menu
    setMenuOpen(true)
  }

  return (
    <div className="App">
      {/* hamburger button to show the menu */}
      <a onClick={menuOn}>
        <svg className="openBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </a>
      {/* controls component => the side menu */}
      <Controls
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        speedVisibility={speedVisibility}
        setSpeedVisibility={setSpeedVisibility}
        showDeaths={showDeaths}
        setShowDeaths={setShowDeaths}
        showInjuries={showInjuries}
        setShowInjuries={setShowInjuries}
        showMinorCrashes={showMinorCrashes}
        setShowMinorCrashes={setShowMinorCrashes}
        showBikePedOnly={showBikePedOnly}
        setShowBikePedOnly={setShowBikePedOnly}
        years={years}
        setYears={setYears}
      />
      {/* render the map */}
      <MapContext
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        speedVisibility={speedVisibility}
        showDeaths={showDeaths}
        showInjuries={showInjuries}
        showMinorCrashes={showMinorCrashes}
        showBikePedOnly={showBikePedOnly}
        years={years}
      />
    </div>
  )
}

export default App;
