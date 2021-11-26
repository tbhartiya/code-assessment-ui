// Add all the admin flow files in this folder
import * as React from 'react';
import PageTitle from '../common/pageTitle'
import { Menus } from './constant'
const Tests = () => {

    return (
        <PageTitle
            title={Menus.tests.title}
            subtitle={Menus.tests.subtitle} />
        // <Grid container spacing={2}>
        //     <Grid item xs={10} m={5}>
        //         <div>
        //             <Typography variant="h3" component="h2" align="left">
        //                 h1. Heading
        //             </Typography>
        //             <Typography variant="subtitle1" component="h2" align="left">
        //                 h1. Heading
        //             </Typography>
        //         </div>
        //     </Grid>
        //     <Grid item xs={12}>
        //     </Grid>
        // </Grid>
    );
};
export default Tests;

