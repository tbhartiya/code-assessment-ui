import * as React from 'react'
import '../../App.css'
import { Button } from '@mui/material'
import { TestSection } from './TestSection'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

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
        type: 'MCQ',
        options: ['A', 'B', 'C'],
        correctOption: 'B',
      },
    ],
  },
]

const Question = ({ displayQuestion, onOptionSelect, answered }) => {
  const { id, title, options } = displayQuestion
  const handleChange = (event) => {
    onOptionSelect({ id, value: event.target.value })
  }
  return (
    <div style={{ width: 700, display: 'flex' }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <RadioGroup
          aria-label="gender"
          name={`controlled-radio-buttons-group-${id}`}
          value={answered}
          onChange={handleChange}
        >
          {' '}
          {options.map((op) => (
            <FormControlLabel
              value={op}
              control={<Radio />}
              label={op}
              key={`${id}-${op}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  )
}

const Test = ({ questions, time = 15 }) => {
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
  const savedAnswer = React.useMemo(() => {
    return answeredQuestions[questions[currentQuestion].id]
  }, [answeredQuestions, currentQuestion, questions])
  return (
    <div>
      {/* <CountDown
        timer="122"
        callback={() => {
          console.log('done!')
        }}
      /> */}
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
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export const TestScreen = () => {
  const [startSection, setStartSection] = React.useState('')

  console.log(startSection)

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
        <Test questions={section} />
      ) : (
        <TestSection
          skills={skills}
          onStartTest={setStartSection}
          showStartButton={true}
        />
      )}
    </div>
  )
}
