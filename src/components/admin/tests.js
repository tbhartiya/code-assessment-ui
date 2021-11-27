import * as React from 'react';
import Box from '@mui/material/Box';
import PageTitle from '../common/pageTitle'
import { Menus } from './constant'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';

const testData = [
    { test_name: 'UI Developer test', applicants: 1, estimation: '12 mins', },
    { test_name: 'Backend Developer test', applicants: 3, estimation: '18 mins' },
    { test_name: 'Fullstack Developer test', applicants: 1, estimation: '10 mins' },
    { test_name: 'Test', applicants: 6, estimation: '21 mins' },
    { test_name: 'UI Developer test', applicants: 5, estimation: '12 mins' },
    { test_name: 'Backend Developer test', applicants: 1, estimation: '18 mins' },
    { test_name: 'Fullstack Developer test', applicants: 4, estimation: '10 mins' },
    { test_name: 'Test', applicants: 3, estimation: '21 mins' },
    { test_name: 'UI Developer test', applicants: 2, estimation: '12 mins' },
    { test_name: 'Backend Developer test', applicants: 1, estimation: '18 mins' },
    { test_name: 'Fullstack Developer test', applicants: 3, estimation: '10 mins' },
    { test_name: 'Test', applicants: 2, estimation: '21 mins' }
];

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
        marginRight: '25px',
        marginBottom: '40px',
        height: '200px'
    },
    infoWrapper: {
        display: 'flex',
        justifyContent: 'space- between',
        marginTop: '50px'
    },
    info: {
        width: '30%',
        marginRight: '10px'
    },
    newCard: {
        backgroundColor: 'rgba(102, 178, 255, 0.15)',
        border: '1px dashed #0072E5'
    },
    centerAlign: {
        lineHeight: '200px',
        textAlign: 'center',
        color: '#0072E5',
        fontWeight: 'bold',
    },
    newTestText: {
        marginTop: '-90px'
    }
}));

const Tests = () => {
    const classes = useStyles();

    return (
        <Box m={5}>
            <PageTitle
                title={Menus.tests.title}
                subtitle={Menus.tests.subtitle} />
            <Box container mt={5}
                className={classes.cardWrapper}
                spacing={10}
            >
                <Card className={classes.card + " " + classes.newCard}
                    key={-1}>
                    <div className={classes.centerAlign}>
                        <AddIcon fontSize={'large'} />
                        <Typography component="h5" variant="h5" className={classes.newTestText}>
                            Create a new test
                        </Typography>
                    </div>
                </Card>
                {testData.map((test, index) => (
                    <Card className={classes.card} key={index}>
                        <Box>
                            <Typography component="div" variant="h5">
                                {test.test_name}
                            </Typography>
                            <div className={classes.infoWrapper}>
                                <div className={classes.info}>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        {test.applicants}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="div">
                                        applicants
                                    </Typography>
                                </div>
                                <div className={classes.info}>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        {test.estimation}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        estimation
                                    </Typography>
                                </div>
                                <div className={classes.info}>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        {test.estimation}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        test blocks
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box >
    );
};
export default Tests;

