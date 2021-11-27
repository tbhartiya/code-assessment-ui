import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import '../../App.css'
import { Typography, Button } from '@mui/material'

export const Section = ({ skills, showStartButton = false, onStartTest }) => {
  const [view, setView] = React.useState('dummy')

  const handleChange = (event, nextView) => {
    setView(nextView)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingBottom: 50,
        paddingTop: 30,
      }}
    >
      <div>
        <ToggleButtonGroup
          orientation="vertical"
          value={view}
          exclusive
          onChange={handleChange}
        >
          {' '}
          {skills.map((skill) => (
            <ToggleButton
              value={skill.id}
              aria-label="list"
              className="Section-title"
              color={skill.id === view ? 'primary' : 'standard'}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: 50,
                  width: 150,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {' '}
                <p>{skill.name}</p>
                {view === skill.id ? <ChevronRightIcon /> : null}
              </div>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div
        style={{
          minWidth: 300,
          borderRadius: 2,
          marginLeft: 10,
          boxShadow: '0px 0px 10px #f0e9e9',
          display: 'flex',
          alignItems: 'flex-start',
          padding: 20,
          flexDirection: 'column',
          width: 500,
        }}
      >
        <div>
          <Typography variant="subtitle2">
            {skills.find((skill) => skill.id === view).name} Overview
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              alignItems: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h6>Estimated Time</h6>
            <Typography variant="caption">15 min</Typography>
          </div>
          <div
            style={{
              alignItems: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h6>Questions</h6>
            <Typography variant="caption">3</Typography>
          </div>
          <div
            style={{
              alignItems: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h6>Format</h6>
            <Typography variant="caption">Multiple Choice</Typography>
          </div>
        </div>
        <Typography variant="caption">
          {skills.find((skill) => skill.id === view).description}
        </Typography>
        {showStartButton && (
          <Button onClick={() => onStartTest(view)}>Start Section</Button>
        )}
      </div>
    </div>
  )
}
