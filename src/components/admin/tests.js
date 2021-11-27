import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import PageTitle from '../common/pageTitle'
import { Menus } from './constant'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add'
import { GET_ALL_TESTS } from './adminQueries'
import { useQuery } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cardWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        direction: 'row',
        justify: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    card: {
        padding: '10px',
        textAlign: 'left',
        width: '30%',
        marginRight: '15px',
        marginBottom: '25px',
        height: '200px',
    },
    infoWrapper: {
        display: 'flex',
        justifyContent: 'space- between',
        marginTop: '50px',
    },
    info: {
        width: '30%',
        marginRight: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    newCard: {
        backgroundColor: 'rgba(102, 178, 255, 0.15) !important',
        border: '1px dashed #0072E5',
    },
    centerAlign: {
        lineHeight: '200px',
        textAlign: 'center',
        color: '#0072E5',
        fontWeight: 'bold',
    },
    newTestText: {
        marginTop: '-90px !important',
    },
    loader: {
        justifyContent: 'center',
        top: '50%',
        position: 'absolute',
        left: '50%'
    }
}))

const Tests = () => {
    const classes = useStyles();
    const [tests, setTests] = useState(null)
    const navigate = useNavigate();

    const { loading, data } = useQuery(GET_ALL_TESTS)

    useEffect(() => {
        if (data?.getAllTests?.length) setTests(data.getAllTests)
    }, [data])

    if (loading) {
        return (<Box sx={{ display: 'flex' }} className={classes.loader}>
            <CircularProgress className={classes.colorPrimary} value={50} />
        </Box>)
    }
    return (
        <Box m={5}>
            <PageTitle
                title={Menus.tests.title}
                subtitle={Menus.tests.subtitle} />
            <Box container mt={5}
                className={classes.cardWrapper}
                spacing={10}
            >
                <Card className={classes.newCard + " " + classes.card}
                    key={-1 + "-new test"} onClick={() => navigate('/tests/new')}>
                    <div className={classes.centerAlign}>
                        <AddIcon fontSize={'large'} />
                        <Typography component="h5" variant="h5" className={classes.newTestText}>
                            Create a new test
                        </Typography>
                    </div>
                </Card>
                {tests?.map((test, index) => (
                    <Card className={classes.card} key={index + "-" + test.name}>
                        <Box>
                            <Typography component="div" variant="h5">
                                {test.name}
                            </Typography>
                            <div className={classes.infoWrapper}>
                                <div className={classes.info}>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        {test?.noOfApplicants || 0}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="div">
                                        applicants
                                    </Typography>
                                </div>
                                <div className={classes.info}>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        1 hr
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        estimation
                                    </Typography>
                                </div>
                                <div className={classes.info}>
                                    {test?.skills?.map((skill) => (
                                        <Typography variant="h6" color="text.secondary" component="div" key={skill.name}>
                                            {skill.name}
                                        </Typography>
                                    ))}
                                    < Typography variant="subtitle1" color="text.secondary" component="div">
                                        skills
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box >
    );
}

export default Tests;