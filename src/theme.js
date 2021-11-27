import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ff8e38',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#000',
    },
    default: {
      main: '#000',
    },
  },
})
