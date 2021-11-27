import React, { useState, useEffect } from 'react';
import PageTitle from '../common/pageTitle'
import { Menus } from './constant'
import ApplicantTable from './applicantTable'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchInput from '../common/search'
import FilterButtons from '../common/filterButtons'
import { makeStyles } from '@mui/styles';
import { GET_ALL_ASSESSMENTS } from './adminQueries'
import { useQuery } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
    midAlign: {
        alignItems: 'center',
    },
    rightAlign: {
        textAlign: 'end'
    },
    colorPrimary: {
        color: '#007FFF'
    },
    loader: {
        justifyContent: 'center',
        top: '50%',
        position: 'absolute',
        left: '50%'
    }
}));
const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Demo Candidate',
    },
    {
        id: 'test',
        numeric: true,
        disablePadding: false,
        label: 'Test taken',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'score',
        numeric: true,
        disablePadding: false,
        label: 'Overall score',
    },
];

const filters = [{ label: 'Overall Score' },
{ label: 'Type' },
{ label: 'Test Name' },
{ label: 'Status' },
{ label: 'Completion Date' }]

const Applicants = () => {
    const classes = useStyles();
    const [assessments, setAssessments] = useState(null)
    const { loading, data } = useQuery(GET_ALL_ASSESSMENTS);

    useEffect(() => {
        if (data?.getAllAssessments?.length)
            setAssessments(data.getAllAssessments)
    }, [data])

    if (loading) {
        return (<Box sx={{ display: 'flex' }} className={classes.loader}>
            <CircularProgress className={classes.colorPrimary} value={50} />
        </Box>)
    }
    return (
        <Box m={5}>
            <PageTitle
                title={Menus.applicants.title}
                subtitle={Menus.applicants.subtitle} />
            <Grid container mt={5}>
                <Grid container className={classes.midAlign}>
                    <Grid item xs={4} >
                        <SearchInput />
                    </Grid>
                    <Grid item xs={8} className={classes.rightAlign}>
                        <FilterButtons filterButtons={filters} />
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={5} >
                    <ApplicantTable headCells={headCells} rows={assessments} caption={'Candidate List'} />
                </Grid>
            </Grid>
        </Box>
    );
};
export default Applicants;

