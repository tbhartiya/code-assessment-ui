import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useQuery } from '@apollo/client'
import { GET_TEST } from '../../queries'
import '../../App.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Typography, Divider, Backdrop, CircularProgress } from '@mui/material'
import { TestSection } from '../user/TestSection'
import { TestScreen } from '../user/TestScreen'

export const TestInstructions = ({ onEndSection, testIdFromURL }) => {
  const [showSections, setShowSections] = React.useState(false)

  const { loading, data } = useQuery(GET_TEST, {
    variables: { testId: testIdFromURL },
  })

  const info = React.useMemo(() => {
    return {
      testName: data?.getAllTests[0]?.name,
      username: JSON.parse(localStorage.getItem('user')).name,
    }
  }, [data])
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ padding: 10, marginTop: 50, marginBottom: 50 }}>
        <Typography variant="h5"> Incedo {info.testName} </Typography>
        <Typography variant="h6"> for {info.username} </Typography>
      </div>
      <Divider />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!loading ? (
        showSections ? (
          <TestScreen onEndSection={onEndSection} testData={data} />
        ) : (
          <div>
            <div
              style={{
                padding: 10,
                paddingTop: 50,
                paddingBottom: 50,
                backgroundColor: '#f0ebeb',
              }}
            >
              <Typography variant="h6"> Instructions </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Incedo uses this technical skills quiz as the next step in their
              hiring process"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="The Test must be completed in one continuous browser session . You
              cannot pause, restart, or retake the test after you click Start
              test below."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="You will see 1 or more skill area sections below, which you can
              take in any order . You cannot pause, restart, or retake a section
              after you select Start section."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Each question is timed and can only be answered once . Your score
              wont change based on how long you spend on each problem. Feel free
              to use the entire time . Unanswered questioned are considered
              incorrect."
                  />
                </ListItem>
              </List>
            </div>
            <TestSection
              showSections={() => setShowSections(true)}
              testData={data}
            />
          </div>
        )
      ) : null}
    </div>
  )
}
