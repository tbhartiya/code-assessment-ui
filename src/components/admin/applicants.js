// Add all the admin flow files in this folder
import * as React from 'react';
import PageTitle from '../common/pageTitle'
import { Menus } from './constant'
import EnhancedTable from '../common/table'
import Grid from '@mui/material/Grid';
import SearchInput from '../common/search'
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
        id: 'test_name',
        numeric: true,
        disablePadding: false,
        label: 'UI developer test',
    },
    {
        id: 'score',
        numeric: true,
        disablePadding: false,
        label: 'Overall score',
    },
    {
        id: 'level',
        numeric: true,
        disablePadding: false,
        label: 'Level',
    },
];

function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

const Applicants = () => {
    return (
        <>
            <PageTitle
                title={Menus.applicants.title}
                subtitle={Menus.applicants.subtitle} />
            <Grid container spacing={2}>
                <Grid container xs={10} m={5}>
                    <Grid item xs={3}>
                        <SearchInput />
                    </Grid>
                    <Grid item xs={7}>
                        {/* <SearchInput /> */}
                    </Grid>
                </Grid>
                <Grid item xs={10} m={5}>
                    <EnhancedTable headCells={headCells} rows={rows} caption={'Candidate List'} />
                </Grid>
                {/* <Grid item xs={12}>
            </Grid> */}
            </Grid>
        </>
    );
};
export default Applicants;

