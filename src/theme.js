import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#d65a20',
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
