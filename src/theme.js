import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export default createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#000',
        },
    },
});