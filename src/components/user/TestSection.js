import * as React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import ToggleButton from '@mui/material/ToggleButton'
import Chip from '@mui/material/Chip'
import '../../App.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Typography, Button } from '@mui/material'
import { Section } from './Section'
import { useQuery } from '@apollo/client'
import { GET_TEST } from '../../queries'

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

export const TestSection = ({
  showSections,
  onStartTest,
  showStartButton,
  completedSections,
}) => {
  const [selected, setSelected] = React.useState(false)

  const chipText = `Est. test length 45 min`

  const data = useQuery(GET_TEST, {
    variables: {},
  })

  return (
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Typography variant="h4">What's On the Test ?</Typography>
      <Chip icon={<AccessTimeIcon />} label={chipText} />
      <Section
        skills={skills}
        onStartTest={onStartTest}
        showStartButton={showStartButton}
        completedSections={completedSections}
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
              color="primary"
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
            disabled={!selected}
          >
            Start Test
          </Button>
        </div>
      )}
    </div>
  )
}
