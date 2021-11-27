import React, { useEffect, useState } from 'react';
import PageTitle from '../common/pageTitle'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { GET_ALL_SKILLS } from './adminQueries'
import { useQuery } from '@apollo/client'

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto'
    }
}));

const CreateNewTest = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const [skills, setKills] = useState(null)
    const { data } = useQuery(GET_ALL_SKILLS);

    useEffect(() => {
        if (data?.getAllSkills?.length)
            setKills(data.getAllSkills)
    }, [data])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    return (
        <Box m={5}>
            <PageTitle
                title={'New Test'}
                subtitle={'Choose skill are blocks, add collabrators, and preview test'}
            />
            <Grid container mt={5} spacing={6} className={classes.container}>
                <Grid item xs={8} mb={2}>
                    <TextField fullWidth label="Test Name" color="primary" />
                </Grid>
                <Grid item xs={8} mb={2}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {skills?.map((skill) => {
                            const labelId = `checkbox-list-label-${skill}`;
                            return (
                                <ListItem
                                    key={skill.name}
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={handleToggle(skill)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={checked.indexOf(skill) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={skill.name} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item xs={8} mb={2}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="primary">Save</Button>
                        <Button variant="primary">
                            Cancel
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};
export default CreateNewTest;