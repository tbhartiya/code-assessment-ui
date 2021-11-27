import * as React from 'react'
import { useMutation } from '@apollo/client'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DoneAllOutlined from '@mui/icons-material/DoneAllOutlined'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Chip from '@mui/material/Chip'
import '../../App.css'
import { Typography, Button } from '@mui/material'
import { SUBMIT_ANSWERS } from '../../queries'

export const Section = ({
  skills,
  showStartButton = false,
  onStartTest,
  completedSections,
  savedAnswers,
  showSections,
  testData,
}) => {
  const getSelectedSection = React.useCallback(() => {
    const pending = skills?.filter(
      (skill) => !completedSections?.find((cs) => cs === skill.id),
    )
    if (pending?.length > 0) {
      return pending[0].id
    } else return ''
  }, [skills, completedSections])
  const [view, setView] = React.useState(getSelectedSection())

  const totalTestTime = React.useMemo(() => {
    let testTime = 0
    skills.forEach((skill) => {
      skill.questions.forEach((q) => {
        if (q.type === 'Coding') {
          testTime = testTime + 5
        } else {
          testTime++
        }
      })
    })
    return testTime
  }, [skills])

  React.useEffect(() => {
    setView(getSelectedSection())
  }, [skills, setView, getSelectedSection])

  const [submitAns, result] = useMutation(SUBMIT_ANSWERS, {
    onError: (error) => {
      console.log('error', error)
    },
  })

  const onSubmitTest = React.useCallback(() => {
    const localUSer = localStorage.getItem('user')
    submitAns({
      variables: {
        userId: JSON.parse(localUSer).id,
        testId: testData.id,
        status: 'Completed',
        userInput: savedAnswers,
      },
    })
  }, [savedAnswers, submitAns, testData.id])

  React.useEffect(() => {
    const pending = skills?.filter(
      (skill) => !completedSections?.find((cs) => cs === skill.id),
    )
    if (!view && skills.length > 0 && pending == 0) {
      onSubmitTest()
    }
  }, [skills, view, completedSections, onSubmitTest])

  const handleChange = (event, nextView) => {
    setView(nextView)
  }

  const getEstimatedTime = React.useCallback((skill) => {
    let time = 0
    if (skill) {
      skill.questions.forEach((q) => {
        if (q.type === 'Coding') {
          time = time + 5
        } else {
          time++
        }
      })
    }
    return time
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {view ? (
        <div>
          <Typography variant="h4">What's On the Test ?</Typography>
          <Chip
            icon={<AccessTimeIcon />}
            label={`Est. Test Length ${totalTestTime} mins`}
          />
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
                    disabled={
                      skill.id === view ||
                      completedSections?.find((section) => section === skill.id)
                    }
                    color={
                      completedSections?.find((section) => section === skill.id)
                        ? 'success'
                        : skill.id === view
                        ? 'secondary'
                        : 'standard'
                    }
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
                      {completedSections?.find(
                        (section) => section === skill.id,
                      ) ? (
                        <DoneAllOutlined />
                      ) : view === skill.id ? (
                        <ChevronRightIcon />
                      ) : null}
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
                  {skills?.find((skill) => skill.id === view)?.name} Overview
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
                  <Typography variant="caption">
                    {getEstimatedTime(
                      skills?.find((skill) => skill.id === view),
                    )}{' '}
                    min
                  </Typography>
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
                {skills.find((skill) => skill.id === view)?.description}
              </Typography>
              {showStartButton && (
                <Button
                  onClick={() => onStartTest(view)}
                  variant="outlined"
                  color="secondary"
                  style={{ width: '100%', marginTop: 20 }}
                >
                  Start Section
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Typography variant="h4">
          You have completed all the sections. Submitting the test . Thankyou
          for your participation.
        </Typography>
      )}

      {!showSections && view && (
        <Button
          onClick={() => onSubmitTest()}
          variant="outlined"
          color="secondary"
          endIcon={<ExitToAppIcon />}
          style={{
            marginTop: 20,
            alignSelf: 'flex-end',
            marginRight: 50,
          }}
        >
          Submit Test
        </Button>
      )}
    </div>
  )
}
