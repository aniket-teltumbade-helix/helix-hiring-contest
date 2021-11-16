import React from 'react'
import Countdown from "react-countdown";

function Timer({time}) {
    return (
        <Countdown date={time} />
    )
}

export default Timer
