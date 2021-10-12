import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Grid,
    Box

} from '@material-ui/core'
import { withRouter } from 'react-router'

const testInstructions = [
    "Ensure that you are attempting the test using the correct email ID.",
    "You must click Submit after you answer each question.",
    "If you need assistance during the test, click the question mark (?) in the lower-right corner of the page to raise a ticket.",
    "Once the test has started, the timer cannot be paused. You have to complete the test in one attempt.",
    "Do not close the browser window or tab of the test interface before you submit your final answers.",
    "It is recommended that you ensure that your system meets HackerEarth's compatibility requirements and check your Internet connection before starting the test.",
    "It is recommended that you attempt the test in an incognito or private window so that any extensions installed do not interfere with the test environment.",
    "We recommend that you close all other windows and tabs to ensure that there are no distractions.",
]
const questinInstructions = [
    "Select a programming language from the list before attempting each question.",
    "For all programming problems, the inputs are taken from STDIN and output to STDOUT.",
    "Click COMPILE & TEST to run your solution against relevant sample test cases before submitting your answer.This is applicable for programming questions only.",
    "You can start solving problems now",

]
const proctorInstructions = [
    "    All popups / tabs / window switches will log you out of the test automatically.We recommend that you close all programs including your email before you start.",
    "You can only copy and paste code within the code editor.However, nothing can be copied and pasted from any external sources including code from the code editor of another question, external websites, etc.",
    "This test is being monitored remotely.Your webcam must be turned on at all times.",
    "This test can be taken in full - screen mode only.",
]

class Instructions extends Component {
    handleRoute = () => {
        this.props.history.push(`/contests/${this.props.match.params.contest}/challenges`)
    }
    render() {
        console.log(this.props);
        return (
            <Box m={6}>
                <Grid container spacing={8}>
                    <Grid item md={12}>
                        <Typography variant="h4" align="center">Use this time to read the instructions.</Typography>
                    </Grid>
                    <Grid item md={8} >
                        <Grid container spacing={2}>
                            <Grid item >
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5">Test Instructions</Typography>
                                        <List>
                                            {testInstructions.map(el => (<ListItem>
                                                <ListItemText>{el}</ListItemText>
                                            </ListItem>))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5">Question - specific Instructions</Typography>
                                        <List>
                                            {questinInstructions.map(el => (<ListItem>
                                                <ListItemText>{el}</ListItemText>
                                            </ListItem>))}
                                        </List>
                                    </CardContent>
                                </Card></Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Card >
                                    <CardActions>
                                        <Box sx={{
                                            minHeight: "20vh", width: "100%",
                                            display: "flex",
                                            direction: "column",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                        >
                                            <Button
                                                sx={{ margin: "auto" }}
                                                color="primary.main"
                                                variant="contained" onClick={this.handleRoute}>
                                                Start Now
                                            </Button>
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5">Proctoring Instructions</Typography>
                                        <List>
                                            {proctorInstructions.map(el => (<ListItem>
                                                <ListItemText>{el}</ListItemText>
                                            </ListItem>))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Instructions))
