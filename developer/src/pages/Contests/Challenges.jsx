import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import { loadContest } from '../../redux/actions/contestActions';
import { runProgram } from '../../redux/actions/problemActions';
import { SingleChallenge } from './Challenge/SingleChallenge';
import { submitProblem } from '../../redux/actions/submitActions';
import { withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
});

class MiniDrawer extends React.Component {
    state = {
        open: false,
        content: 0,
        flag: false,
        completed: false
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        this.props.loadContest({ name: this.props.match.params.contest })
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
            toast.warning("Back Button isn't Allowed. You should End Test First!");
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.content !== this.state.content) {
            this.setState({ flag: false });
        }
    }
    handleRun = (language, code, samples, data, flag) => {
        this.props.runProgram(language, code, samples, data)
        this.setState({ flag })
    }
    handleSubmit = (data) => {
        let { language, code } = data
        let cId = this.state.content
        let challenge = this.props.loadData.challenges[cId]
        let { name, test_cases, points } = challenge
        let queryObj = { language, script: code, contest: this.props.loadData.name, challenge: name, test_cases, points }
        this.props.submitProblem(queryObj).then((res) => {
            if (this.props.loadData.challenges.length - 1 > this.state.content) {
                this.setState({ content: this.state.content + 1 })
            }
            else {
                this.setState({ completed: true })
            }
            if(res){
                toast.success("Submitted Successfully!")
            }
        })

    }
    render() {
        const { classes, theme } = this.props;
        return this.props.loadData ? (
            <div className={classes.root} style={{ maxwidth: "100%" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open} style={{ display: "flex" }}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                            size="large"
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" style={{ width: "85vw" }} color="secondary">
                            {this.props.loadData.data.name}
                        </Typography>
                        <Button variant="contained" color="secondary" size="small" onClick={() => this.props.history.push("end")}>End Test</Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {this.props.loadData.challenges.map((text, index) => (
                            <ListItem button key={index} onClick={() => this.setState({ content: index })}>
                                <ListItemIcon><Typography variant="h2" align="center">{index}</Typography></ListItemIcon>
                                <ListItemText primary={text.name} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div style={{ width: '100%', height: '5vh' }} />
                    <SingleChallenge
                        data={this.props.loadData.challenges[this.state.content]}
                        handleRun={this.handleRun}
                        handleSubmit={this.handleSubmit}
                        result={
                            this.state.flag ?
                                this.props.result[this.props.result.length - 1] :
                                null} />
                </main>
                <ToastContainer />
            </div>
        ) : null;
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


const mapStateToProps = storeState => {
    return {
        loadData: storeState.contestState.contest_data,
        result: storeState.problemState.problem_output
    }
}

export default connect(mapStateToProps, { loadContest, runProgram, submitProblem })(withStyles(styles, { withTheme: true })(withRouter(MiniDrawer)));
