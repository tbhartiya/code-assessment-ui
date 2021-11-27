import React, { useCallback, useState } from 'react'
import Paper from '@mui/material/Paper'

export const Countdown = ({ minutes, onTimeUp }) => {
  const [clockState, setClockState] = useState({
    clock: 0,
    hoursSpan: 0,
    minutesSpan: 0,
    secondsSpan: 0,
  })

  const getTimeRemaining = (endtime) => {
    var t = Date.parse(endtime) - Date.parse(new Date())
    var seconds = Math.floor((t / 1000) % 60)
    var minutes = Math.floor((t / 1000 / 60) % 60)
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24)
    return {
      total: t,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }
  }

  const initializeClock = useCallback((deadline) => {
    const updateClock = () => {
      var t = getTimeRemaining(deadline)

      setClockState({
        hoursSpan: ('0' + t.hours).slice(-2),
        minutesSpan: ('0' + t.minutes).slice(-2),
        secondsSpan: ('0' + t.seconds).slice(-2),
      })

      if (t.total <= 0) {
        clearInterval(timeinterval)
      }
    }

    updateClock()
    var timeinterval = setInterval(updateClock, 1000)
  }, [])
  React.useEffect(() => {
    var deadline = new Date(Date.parse(new Date()) + minutes * 60 * 1000)
    initializeClock(deadline)
  }, [initializeClock, minutes])

  React.useEffect(() => {
    if (
      clockState.hoursSpan === 0 &&
      clockState.minutesSpan === 0 &&
      clockState.seconds === 0
    ) {
      onTimeUp()
    }
  }, [clockState, onTimeUp])
  console.log('Calling')
  return (
    <div
      style={{ width: 200, position: 'absolute', right: 0, marginRight: 50 }}
    >
      <Paper
        variant="outlined"
        square
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <h6>Time Left</h6>
        <div>
          <span className="minutes">{clockState.minutesSpan} m</span>
        </div>
        <div>
          <span className="seconds">{clockState.secondsSpan} s</span>
        </div>
      </Paper>
    </div>
  )
}
