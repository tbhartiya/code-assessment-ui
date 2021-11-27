import * as React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ToggleButton from '@mui/material/ToggleButton'
import '../../App.css'
import { Typography, Button } from '@mui/material'
import { Section } from './Section'

export const TestSection = ({
  showSections,
  onStartTest,
  showStartButton,
  completedSections,
  savedAnswers,
  testData: data,
  assessId,
  setAssessmentId,
}) => {
  const [selected, setSelected] = React.useState(false)
  const [skills, setSkills] = React.useState([])

  React.useEffect(() => {
    const skillData = data?.getAllTests[0]?.skills
    setSkills(skillData)
  }, [data, setSkills])

  const testData = React.useMemo(() => {
    const testData = {}
    testData.testId = data?.getAllTests[0]?.testId
    testData.id = data?.getAllTests[0]?.id
    testData.name = data?.getAllTests[0]?.name
    return testData
  }, [data])

  return (
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Section
        skills={skills}
        onStartTest={onStartTest}
        showStartButton={showStartButton}
        completedSections={completedSections}
        savedAnswers={savedAnswers}
        showSections={showSections}
        testData={testData}
        assessId={assessId}
        setAssessmentId={setAssessmentId}
      />
      {!!showSections && (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
          >
            <ToggleButton
              value="check"
              selected={selected}
              size="small"
              color="secondary"
              onChange={() => {
                setSelected(!selected)
              }}
            >
              <CheckIcon />
            </ToggleButton>
            <Typography variant="caption" style={{ marginLeft: 10 }}>
              Pledge: I promise to answer myself without help from anyone
            </Typography>
          </div>
          <Button
            onClick={() => showSections()}
            variant="outlined"
            color="secondary"
            disabled={!selected}
          >
            Start Test
          </Button>
        </div>
      )}
    </div>
  )
}
