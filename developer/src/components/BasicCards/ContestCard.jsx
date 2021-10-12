import React from 'react'
import {
    Card,
    CardActionArea, Typography,
    CardContent, Box, Button, CardActions
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const styles = {
    card: {
        maxWidth: "auto",
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};

const ContestCard = (props) => {
    const { classes } = props;
    console.log(props);
    return (
        <Card className={classes.card} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', margin: "10px" }} >
            <Box bgcolor={props.bgColor} sx={{ height: "100%" }}>
                <CardActionArea>
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div" noWrap>
                            {props.data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: props.data.description.split("</p>")[0] + "</p>" }}>
                        </Typography>
                    </CardContent >
                </CardActionArea >
            </Box>
            <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
                {props.endtime && <Typography variant="caption">Ended {props.endtime}</Typography>}
                {props.uptime && <Typography variant="caption">Will be live {props.uptime}</Typography>}
                {props.starttime && <Typography variant="caption">Started {props.starttime}</Typography>}
                {props.starttime && (
                    <Link to={`/contests/${props.data.name}`}>
                        <Button variant="contained" color="primary">Start Test</Button>
                    </Link>
                )}
                {props.uptime && (
                    <Button variant="outlined" color="secondary">Start Test</Button>
                )}
                {props.endtime && (
                    <Button variant="outlined" color="secondary">Start Test</Button>
                )}
            </CardActions>
        </Card >
    )
}

export default withStyles(styles)(ContestCard)
