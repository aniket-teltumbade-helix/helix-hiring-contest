import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Card,
    Typography,
    CardContent, Box, Button, CardActions
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contestStatus } from "../../redux/actions/endContestAction";

const styles = {
    card: {
        maxWidth: "auto",
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};
class ContestCard extends Component {
    handleRoute = (name) => {
        this.props.contestStatus({ name }).then((data) => {
            if (data.msg.status === true) {
                toast.error("You have already submitted this test!")
            }
            else {
                this.props.history.push(`/contests/${name}`)
            }
        })
    }
    render() {
        const { classes } = this.props;
        const { props } = this
        return (
            <>
                <Card className={classes.card} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', margin: "10px" ,flexBasis:280}} >
                    <Box bgcolor={props.bgColor} sx={{ height: "100%" }}>
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div" noWrap>
                                    {props.data.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: props.data.description.split("</p>")[0] + "</p>" }}>
                                </Typography>
                            </CardContent >
                    </Box>
                    <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
                        {props.endtime && <Typography variant="caption">Ended {props.endtime}</Typography>}
                        {props.uptime && <Typography variant="caption">Will be live {props.uptime}</Typography>}
                        {props.starttime && <Typography variant="caption">Started {props.starttime}</Typography>}
                        {props.starttime && (
                            <Button variant="contained" color="primary" onClick={() => this.handleRoute(props.data.name)}>Start Test</Button>
                        )}
                        {props.uptime && (
                            <Button variant="outlined" color="secondary">Start Test</Button>
                        )}
                        {props.endtime && (
                            <Button variant="outlined" color="secondary">Start Test</Button>
                        )}
                    </CardActions>
                </Card >
                <ToastContainer />
            </>
        )
    }
}

const mapStateToProps = () => ({

})

export default connect(mapStateToProps, {contestStatus})(withStyles(styles)(withRouter(ContestCard)))
