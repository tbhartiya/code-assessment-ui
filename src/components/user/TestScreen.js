import * as React from 'react'
import '../../App.css'
import { Button, TextField } from '@mui/material'
// import DoneIcon from '@mui/icons-material/Done'
import { TestSection } from './TestSection'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Countdown } from './CountDown'

const Question = ({ displayQuestion, onOptionSelect, answered }) => {
  const { id, title, options, type } = displayQuestion
  const [value, setCodeValue] = React.useState('')
  const handleChange = (event) => {
    onOptionSelect({ id, value: event.target.value })
  }
  return (
    <div
      style={{
        width: 700,
        display: 'flex',
      }}
    >
      <FormControl component="fieldset">
        <FormLabel
          color="default"
          style={{ marginBottom: 20, alignSelf: 'flex-start' }}
        >
          {title?.trim()}
        </FormLabel>
        {type === 'Coding' ? (
          <TextField
            id="filled-multiline-flexible"
            multiline
            minRows={4}
            value={value}
            style={{ width: 600, margin: 20 }}
            onBlur={handleChange}
            onChange={(e) => setCodeValue(e.target.value)}
            variant="outlined"
            color="secondary"
          />
        ) : (
          <RadioGroup
            aria-label="gender"
            name={`controlled-radio-buttons-group-${id}`}
            value={answered}
            color="secondary"
            onChange={handleChange}
          >
            {' '}
            {options.map((op) => (
              <FormControlLabel
                value={op}
                control={<Radio color="secondary" />}
                label={op}
                key={`${id}-${op}`}
              />
            ))}
          </RadioGroup>
        )}
      </FormControl>
    </div>
  )
}

const Test = ({ questions, onEndSection, skillId, saveSectionAnswers }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [answeredQuestions, setAnswered] = React.useState({})
  const onOptionSelect = React.useCallback(
    ({ id: qId, value }) => {
      const newAnswer = {}
      newAnswer[`${qId}`] = value
      setAnswered((prev) => {
        return { ...prev, ...newAnswer }
      })
    },
    [setAnswered],
  )
  const sectionTime = React.useMemo(() => {
    let time = 0
    questions.forEach((element) => {
      if (element.type === 'Coding') {
        time = time + 5
      } else {
        time++
      }
    })
    return time
  }, [questions])
  const endSection = () => {
    onEndSection(skillId)
    saveSectionAnswers(answeredQuestions)
  }
  const savedAnswer = React.useMemo(() => {
    return answeredQuestions[questions[currentQuestion].id]
  }, [answeredQuestions, currentQuestion, questions])
  return (
    <div>
      <Countdown minutes={sectionTime} onTimeUp={endSection} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 40,
        }}
      >
        <Button
          disabled={currentQuestion === 0}
          variant="outlined"
          color="secondary"
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
        >
          Back
        </Button>
        <Question
          displayQuestion={questions[currentQuestion]}
          answered={savedAnswer || ''}
          onOptionSelect={onOptionSelect}
        />
        <Button
          onClick={() => setCurrentQuestion((prev) => prev + 1)}
          disabled={currentQuestion === questions.length - 1}
          color="secondary"
          variant="outlined"
        >
          Next
        </Button>
      </div>
      <Button onClick={endSection} variant="outlined" color="secondary">
        End Section
      </Button>
    </div>
  )
}

export const TestScreen = ({ testData: data }) => {
  const [startSection, setStartSection] = React.useState('')
  const [completedSections, setCompletedSections] = React.useState([])
  const [sectionWiseAnswer, setSectionWiseAnswer] = React.useState([])
  const [assessId, setAssessmentId] = React.useState('')

  const [skills, setSkills] = React.useState([])

  React.useEffect(() => {
    const skillData = data?.getAllTests[0]?.skills
    setSkills(skillData)
  }, [data, setSkills])

  const onEndSection = React.useCallback(
    (section) => {
      setCompletedSections((prev) => [...prev, section])
      setStartSection('')
    },
    [setCompletedSections, setStartSection],
  )

  const section = React.useMemo(() => {
    return skills?.find((skill) => skill.id === startSection)?.questions
  }, [startSection, skills])

  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      {section ? (
        <Test
          questions={section}
          onEndSection={onEndSection}
          skillId={startSection}
          saveSectionAnswers={(answers) => {
            const qArray = Object.keys(answers)
            const arrayOfAnswers = qArray.map((q) => {
              let obj = {}
              obj['questionId'] = q
              obj['answer'] = answers[q]
              return obj
            })
            setSectionWiseAnswer((prev) => [...prev, ...arrayOfAnswers])
          }}
        />
      ) : (
        <TestSection
          testData={data}
          onStartTest={setStartSection}
          showStartButton={true}
          completedSections={completedSections}
          savedAnswers={sectionWiseAnswer}
          assessId={assessId}
          setAssessmentId={setAssessmentId}
        />
      )}
    </div>
  )
}
