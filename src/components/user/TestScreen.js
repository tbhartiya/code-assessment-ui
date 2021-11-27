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

const skills = [
  {
    id: 'dummy',
    name: 'React',
    description: 'Questions on Hooks',
    noOfQuestions: 3,
    questions: [
      {
        id: 'Q1',
        title: 'What is useState Hook',
        type: 'MCQ',
        options: ['A', 'B', 'C'],
        correctOption: 'A',
      },
      {
        id: 'Q2',
        title: 'What is useEffect Hook',
        type: 'MCQ',
        options: ['A', 'B', 'C'],
        correctOption: 'B',
      },
      {
        id: 'Q3',
        title: 'What is useCallback Hook',
        type: 'MCQ',
        options: ['A', 'B', 'C'],
        correctOption: 'C',
      },
    ],
  },
  {
    id: 'dummy2',
    name: 'Javascript',
    description:
      'JavaScript is a scripting or programming language that allows you to implement complex features on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. — you can bet that JavaScript is probably involved. It is the third layer of the layer cake of standard web technologies, two of which (HTML and CSS) we have covered in much more detail in other parts of the Learning Area.',
    noOfQuestions: 2,
    questions: [
      {
        id: 'Q1',
        title: 'What is new in ES6',
        type: 'MCQ',
        options: ['A', 'B', 'C'],
        correctOption: 'A',
      },
      {
        id: 'Q2',
        title: 'What is Arrow Function',
        type: 'coding',
        options: ['A', 'B', 'C'],
        correctOption: 'B',
      },
    ],
  },
]

const Question = ({ displayQuestion, onOptionSelect, answered }) => {
  const { id, title, options, type } = displayQuestion
  const [value, setCodeValue] = React.useState('')
  const handleChange = (event) => {
    console.log('event', event.target.value)
    onOptionSelect({ id, value: event.target.value })
  }
  return (
    <div style={{ width: 700, display: 'flex' }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        {type === 'coding' ? (
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

const Test = ({ questions, time = 15, onEndSection, skillId }) => {
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
  const endSection = () => {
    onEndSection(skillId)
  }
  const savedAnswer = React.useMemo(() => {
    return answeredQuestions[questions[currentQuestion].id]
  }, [answeredQuestions, currentQuestion, questions])
  return (
    <div>
      <Countdown minutes={10} />
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

export const TestScreen = () => {
  const [startSection, setStartSection] = React.useState('')
  const [completedSections, setCompletedSections] = React.useState([])

  console.log(startSection)

  const onEndSection = React.useCallback(
    (section) => {
      setCompletedSections((prev) => [...prev, section])
      setStartSection('')
    },
    [setCompletedSections, setStartSection],
  )

  const section = React.useMemo(() => {
    return skills?.find((skill) => skill.id === startSection)?.questions
  }, [startSection])

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
        />
      ) : (
        <TestSection
          skills={skills}
          onStartTest={setStartSection}
          showStartButton={true}
          completedSections={completedSections}
        />
      )}
    </div>
  )
}
