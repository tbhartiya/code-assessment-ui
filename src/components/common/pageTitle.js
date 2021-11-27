import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const PageTitle = ({ title, subtitle }) => (
    <Grid container>
        <Grid item xs={10}>
            <div>
                <Typography variant="h4" component="h4" align="left">
                    {title}
                </Typography>
                <Typography variant="subtitle1" component="h2" align="left">
                    {subtitle}
                </Typography>
            </div>
        </Grid>
        <Grid item xs={12}>
        </Grid>
    </Grid>
)

export default PageTitle;
