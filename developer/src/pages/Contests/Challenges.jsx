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
import { loadContest, loadProblem } from '../../redux/actions/contestActions';
import { runProgram } from '../../redux/actions/problemActions';
import { SingleChallenge } from './Challenge/SingleChallenge';
import { submitProblem } from '../../redux/actions/submitActions';
import { withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contestStatus } from '../../redux/actions/endContestAction';
import Timer from '../../components/Timer';
import { withCookies, Cookies } from 'react-cookie';

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
        flag: false,
        completed: false,
        timer: null
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        let { contest, challenge } = this.props.match.params
        this.props.loadContest({ name: contest })
        this.props.loadProblem({ name: contest, challenge })
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
            toast.warning("Back Button isn't Allowed. You should End Test First!");
        });
        this.props.contestStatus({ name: contest }).then((data) => {
            if (data.msg.status === true) {
                this.props.history.push('/')
            }
        })
        this.setState({timer:this.props.cookies.get('timer').time});
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.challenge !== this.props.match.params.challenge) {
            this.setState({ flag: false });
            let { contest, challenge } = this.props.match.params
            this.props.loadProblem({ name: contest, challenge })
        }
    }
    handleRun = (language, code, samples, data, flag) => {
        this.props.runProgram(language, code, samples, data)
        this.setState({ flag })
    }
    handleSubmit = (data) => {
        let { language, code } = data
        let challenge = this.props.loadData.challenges.filter(data => data.name === this.props.match.params.challenge)[0]
        let { name, test_cases, points } = challenge
        let queryObj = { language, script: code, contest: this.props.loadData.name, challenge: name, test_cases, points }
        this.props.submitProblem(queryObj).then((res) => {
            if (this.props.loadData.challenges.length - 1 > this.state.content) {
                this.setState({ content: this.state.content + 1 })
            }
            else {
                this.setState({ completed: true })
            }
            if (res) {
                toast.success("Submitted Successfully!")
            }
        })
    }
    render() {
        const { classes, theme } = this.props;
        return this.props.loadData ? (
            <>
                <div className={classes.root} style={{ maxwidth: "100%" }} refs={this.fscreen}>
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
                            {this.state.timer && <Typography><Timer time={this.state.timer}/></Typography>}
                            <Button variant="contained" color="secondary" size="small" onClick={() => {
                                // closeScreen()
                                this.props.history.push("../sections")
                            }}>Back</Button>
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
                                <ListItem button key={index} onClick={() => {
                                    this.props.history.push(`${text.name}`)
                                }
                                }
                                selected={text.name===this.props.match.params.challenge}
                                >
                                    <ListItemIcon><Typography variant="h2" align="center">{index + 1}</Typography></ListItemIcon>
                                    <ListItemText primary={text.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div style={{ width: '100%', height: '5vh' }} />
                        {this.props.problem && <SingleChallenge
                            data={this.props.problem}
                            handleRun={this.handleRun}
                            handleSubmit={this.handleSubmit}
                            result={
                                this.state.flag ?
                                    this.props.result[this.props.result.length - 1] :
                                    null} />}
                    </main>
                    <ToastContainer />
                </div>
            </>
        ) : null;
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired
};


const mapStateToProps = storeState => {
    return {
        loadData: storeState.contestState.contest_data,
        result: storeState.problemState.problem_output,
        problem: storeState.contestState.problem_data
    }
}

export default connect(mapStateToProps, { loadContest, runProgram, submitProblem, loadProblem, contestStatus })(withStyles(styles, { withTheme: true })(withCookies(withRouter(MiniDrawer))));
