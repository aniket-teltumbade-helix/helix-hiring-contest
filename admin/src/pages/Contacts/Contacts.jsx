import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Box, Grid, IconButton, Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { addContact, loadContacts } from '../../redux/actions/contactActions';
import BasicTable from '../../components/BasicTable';

class Contacts extends Component {
    state = {
        open: false,
        full_name: '',
        mobile_no: '',
        email: ''
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        this.props.loadContacts()
    }
   
    handleAdd = () => {
        this.props.addContact(this.state)
        this.setState({
            open: false,
            full_name: '',
            mobile_no: '',
            email: ''
        })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        component="h2"
                        variant="h4"
                        color="textSecondary"
                        gutterBottom
                    >
                        Contacts
                    </Typography>
                    <IconButton onClick={this.handleOpen}>
                        <Add />
                    </IconButton>
                </Box>
                <Box>
                    {this.props.loadData && <BasicTable
                        rows={this.props.loadData.msg.map((el, index) => ({ ...el, id: index }))}
                        columns={[
                            { field: "id", flex: 1 },
                            { field: "full_name", flex: 1 },
                            { field: "email", flex: 1 },
                            { field: "mobile_no", flex: 1 }]}
                            height="70vh"
                    />}
                </Box>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="Dialog-Dialog-title"
                    aria-describedby="Dialog-Dialog-description"
                >
                    <DialogContent>
                        <DialogTitle>Add Contact</DialogTitle>
                        <Grid container spacing="1">
                            <Grid item md={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label="Full Name"
                                    onChange={this.handleInput}
                                    name="full_name"
                                />
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label="Email"
                                    onChange={this.handleInput}
                                    name="email" />
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    label="Mobile"
                                    onChange={this.handleInput}
                                    name="mobile_no" />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAdd}>Add</Button>
                        <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

const mapStateToProps = (storeState) => {
    return { loadData: storeState.contactState.view_contact }
}


export default connect(mapStateToProps, { addContact, loadContacts })(Contacts)
