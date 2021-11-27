import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    borderdButton: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        background: theme.palette.primary.main,
        border: '1px solid black'
    }
}));

const FilterButtons = ({ filterButtons }) => {
    const classes = useStyles();
    return (
        <Box sx={{ '& button': { m: 1 } }}>
            {filterButtons.map((button) => (
                <Button variant="primary" size="small"
                    className={classes.borderdButton} key={button.label}>
                    {button.label}
                </Button>
            ))}
        </Box>
    );
}

export default FilterButtons