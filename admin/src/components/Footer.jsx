import React from 'react'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    appBar: {
      top: "auto",
      bottom: 0
    }
  };
const Footer = ({ classes }) => {
    return (
        <AppBar position="fixed" color="secondary"  className={classes.appBar}>
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" color="inherit" style={{fontSize: 12, textAlign: "center", width: "100%"}}>
                        © 2021, Helix Stack Technologies LLP
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
Footer.propTypes = {
    classes: PropTypes.object.isRequired
  };
  export default withStyles(styles)(Footer);
