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
import { loadContest, loadMcq } from '../../redux/actions/contestActions';
import { withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleQuiz from './Quiz/SingleQuiz';
import { submitQuiz } from '../../redux/actions/submitActions';
import { contestStatus } from '../../redux/actions/endContestAction';
import { withCookies, Cookies } from 'react-cookie';
import Timer from '../../components/Timer';
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

class Quiz extends React.Component {
    state = {
        open: false,
        flag: false,
        completed: false,
        content: 0
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        let { contest, mcq } = this.props.match.params
        this.props.loadContest({ name: contest })
        this.props.loadMcq({ name: contest, mcq })
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function () {
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
        let { mcq } = this.props.match.params
        if (JSON.stringify(prevProps.loadData) !== JSON.stringify(this.props.loadData)) {
            this.props.loadData.mcqs.map((el, index) => {
                if (el.name === mcq) {
                    this.setState({ content: index })
                }
            });
            console.log(this.props.loadData);
        }
        if (prevProps.match.params.mcq !== this.props.match.params.mcq) {
            this.setState({ flag: false });
            let { contest, mcq } = this.props.match.params
            this.props.loadMcq({ name: contest, mcq })
            this.props.loadData.mcqs.map((el, index) => {
                if (el.name === mcq) {
                    this.setState({ content: index })
                }
            });
        }
    }

    handleSubmit = (data) => {
        this.props.submitQuiz(data).then((response) => {
            console.log(response);
        })
        console.log(this.props.loadData.mcqs.length, this.state.content + 1);
        if (this.props.loadData.mcqs.length !== this.state.content + 1) {
            this.props.history.push(this.props.loadData.mcqs[this.state.content + 1].name)
        }
    }
    handlePrev = () => {
        let { contest, mcq } = this.props.match.params
        this.props.history.push(this.props.loadData.mcqs[this.state.content - 1].name)

    }
    handleNext = () => {
        let { contest, mcq } = this.props.match.params
        this.props.history.push(this.props.loadData.mcqs[this.state.content + 1].name)
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
                            {this.props.loadData.mcqs.map((text, index) => (
                                <ListItem button key={index} onClick={() => {
                                    this.props.history.push(`${text.name}`)
                                }
                                }
                                selected={text.name===this.props.match.params.mcq}
                                >
                                    <ListItemIcon><Typography variant="h2" align="center">{index + 1}</Typography></ListItemIcon>
                                    <ListItemText primary={text.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div style={{ width: '100%', height: '5vh' }} />
                        {this.props.quiz && <SingleQuiz
                            data={this.props.quiz}
                            handleSubmit={this.handleSubmit}
                            handlePrev={this.handlePrev}
                            handleNext={this.handleNext}
                            index={this.state.content}
                            length={this.props.loadData.mcqs.length}
                            contest={this.props.loadData.name}
                        />}
                    </main>
                    <ToastContainer />
                </div>
            </>
        ) : null;
    }
}

Quiz.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired
};


const mapStateToProps = storeState => {
    return {
        loadData: storeState.contestState.contest_data,
        result: storeState.problemState.problem_output,
        quiz: storeState.contestState.quiz_data
    }
}

export default connect(mapStateToProps, { loadContest, loadMcq, submitQuiz, contestStatus })(withStyles(styles, { withTheme: true })(withCookies(withRouter(Quiz))));
