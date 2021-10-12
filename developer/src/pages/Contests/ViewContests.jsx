import * as React from 'react'
import PropTypes from 'prop-types'
import LiveContests from '../../components/View/LiveContests'
import { Box, Grid, Typography } from '@material-ui/core'
import UpcomingContests from '../../components/View/UpcomingContests'
import EndedContests from '../../components/View/EndedContests'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
}


export default function ViewContests() {


    return (
        <Box mx={12} pt={3}>
            <Grid container >
                <LiveContests />
                <UpcomingContests />
                <EndedContests />
            </Grid>
        </Box >
    )
}
