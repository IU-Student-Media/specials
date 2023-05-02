import React, { useState, useEffect, Fragment } from "react"
import './App.css'
import Switch from "react-switch"
import ReactSlider from 'react-slider'
import { Checkbox } from 'react-input-checkbox';
import MultiSlider from 'multi-slider';

function ControlButton(props) {

    const { type, textOn, textOff, flag, setFlag, flagSecondary, smallLabels, setSecondaryFlag } = props

    const [text, setText] = useState(textOn)

    const [sliderValues, setSliderValues] = useState([0, 19, 0])

    const onChange = () => {
        if (type === "toggle" || type === "checkbox") {
            setFlag(!flag)
            if (setSecondaryFlag) {
                // console.log('setting secondary flag', setSecondaryFlag)
                setSecondaryFlag(flag)
            }
            setText(flag ? (textOff ? textOff : textOn) : textOn)
        } else if (type === "slider") {

        }
    }

    useEffect(() => {
        if (type === "year-filter") {
            const arrLength = sliderValues[1] + 1
            let nums = [...Array(arrLength).keys()]

            nums = nums.map((num) => num + 2003 + sliderValues[0])
            setFlag(nums)
        }
    }, [sliderValues, setFlag])

    switch (type) {
        case "toggle":
            return (
                <div className="dashControl">
                    <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>{text}</span>

                        <Switch
                            className={'react-switch'}
                            onChange={onChange}
                            checked={flag}
                            // onColor={"#000"}
                            offColor={"#bda8a8"}
                            handleDiameter={16}
                            checkedIcon={false}
                            uncheckedIcon={<Fragment />}
                            height={22}
                            width={45}
                        />
                    </label>
                </div>
            )
        case "checkbox":
            return (
                <div className="dashControl">
                    <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>{text}</span>
                        <Checkbox
                            // theme="fancy-checkbox"
                            // disabled={props.disabled}
                            value={flag}
                            onChange={onChange}
                        />
                    </label>
                </div>
            )
        case "slider":
            return (
                <div className="dashControl">
                    <label className={`react-slider ${flagSecondary !== 'null' ? !flagSecondary ? 'disabled' : '' : ''}`}>
                        <span>{textOn}</span>
                        <ReactSlider
                            disabled={flagSecondary !== 'null' ? !flagSecondary : false}
                            defaultValue={2}
                            markClassName="mark"
                            className="react-slider"
                            min={1}
                            max={4}
                            // marks={1}
                            thumbClassName="thumb"
                            trackClassName="track"
                            onChange={(val) => setFlag(val)}
                        // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span className="small-label">{smallLabels[0]}</span>
                            <span className="small-label">{smallLabels[1]}</span>
                        </div>
                    </label>
                </div>
            )
        case "year-filter":
            return (
                <label>
                    <span>Years</span>
                    <div className="multi-slider">
                        <svg width="100%" height="100%" viewBox="0 0 360 30" style={{
                            margin: '0 auto',
                            display: 'block'
                        }}>
                            <text x={(sliderValues[0] / 19 * 81) + 9.5 + '%'} y="30" textAnchor='middle' style={{
                                fill: 'white',
                                fontSize: 22,
                            }}>{flag[0]}</text>
                            <text x={((1 - sliderValues[2] / 19) * 81) + 9.5 + '%'} y="30" textAnchor='middle' style={{
                                fill: 'white',
                                fontSize: 22,
                            }}>{flag.slice(-1)}</text>
                        </svg>
                        <MultiSlider
                            colors={['gray', 'rgb(0, 136, 0)', 'gray']}
                            values={sliderValues}
                            onChange={e => setSliderValues(e)}
                        />
                    </div>
                </label>
            )
    }
}

export default ControlButton;


