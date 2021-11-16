import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { Typography, CardContent, CardActions, Card, Button, Box } from "@material-ui/core";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles'
import { withRouter } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import { solvedChallenges, solvedMcqs } from '../../redux/actions/leaderboardActions';
import { loadContest } from '../../redux/actions/contestActions';
import Footer from '../../components/Footer';
import { contestStatus, endContest } from '../../redux/actions/endContestAction';
import { withCookies, Cookies } from 'react-cookie';
import Timer from '../../components/Timer';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%'
    },
    card: {
        width: 500,
        minWidth: 300,
        maxWidth: '80%',
        margin: 10,
    }

}
const data = [
    { text: 'Multiple Choice Questions', link: 'mcqs' },
    { text: 'Challenges', link: 'challenges' },
]



const CardItem = ({ text, link, handleRoute, data }) => (
    <>
        <CardContent>
            <Typography variant="h5" component="div">
                {text}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {data.map(el => (
                    <Box sx={{ margin: 20 }}>
                        <Button
                            variant="contained"
                            color={el.status ? "" : "primary"}
                            style={{background:el.status?"red":null}}
                            onClick={() => handleRoute(`${link}/${el.name}`)}
                        >
                            {el.id + 1}
                        </Button>
                    </Box>
                ))}
            </Box>
        </CardContent>
        <CardActions>
            <Button size="small" color="primary" variant="outlined" onClick={() => handleRoute(`${link}/${data[0].name}`)}>Solve</Button>
        </CardActions>
    </>
);

var elem = document.documentElement;
const goFullScreen = () => {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
};

class CotestSections extends Component {
    state = {
        fullscreen: false,
        contest: null,
        solved: {
            challenges: null,
            mcqs: null
        },
        timer: null
    };
    handleRoute = (link) => {
        this.props.history.push(link);
    }
    fscreen = createRef()

    handleFullScreen = () => {
        goFullScreen()
        localStorage.setItem('fullscreen', '1')
        this.setState({ fullscreen: true })
    }
    componentDidMount() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function () {
            window.history.pushState(null, document.title, window.location.href);
            toast.warning("Back Button isn't Allowed. You should End Test First!");
            return false;
        });
        
        if (localStorage.getItem('fullscreen')) {
            this.setState({ fullscreen: true })
        }
        let { contest } = this.props.match.params
        this.props.contestStatus({ name: contest }).then((data) => {
            if (data.msg.status === true) {
                this.props.history.push('/')
            }
        })

        this.setState({timer:this.props.cookies.get('timer').time});
        this.props.loadContest({ name: contest }).then(res => {
            let c = res.challenges.map(el => el.name)
            let m = res.mcqs.map(el => el.name)

            this.props.solvedChallenges({
                contest,
                challenges: c
            }).then(el1 => {
                let c2 = c.map((id1, index) => ({
                    status: el1.some(({
                        challenge: id2
                    }) => id1 === id2),
                    id: index,
                    name: id1
                }))
                console.log(c2);
                this.setState({
                    solved: { ...this.state.solved, challenges: c2 }
                });
            })
            this.props.solvedMcqs({
                contest,
                mcqs: m
            }).then(el1 => {
                let m2 = m.map((id1, index) => ({
                    status: el1.some(({
                        mcq: id2
                    }) => id1 === id2),
                    name: id1,
                    id: index
                }))
                console.log(m2);
                this.setState({
                    solved: { ...this.state.solved, mcqs: m2 }
                });
            })
        })
    }
    render() {
        console.log(this.state.solved['mcqs']);
        return (
            <>
                {!this.state.fullscreen && <div style={{ background: 'white', position: 'absolute', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '9999' }}>
                    <Button onClick={this.handleFullScreen}>Allow Fullscreen</Button>
                </div>}
                <Typography style={{ fontSize:35, textAlign: 'center',margin: 20}}>{this.props.match.params.contest}</Typography>
                {this.state.timer && <Typography style={{ fontSize:20, textAlign: 'center',margin: 20}}><Timer time={this.state.timer}/></Typography>}
                <div className={this.props.classes.container} refs={this.fscreen}>
                    {data.map(el => (
                        this.state.solved[el.link] && (this.state.solved[el.link].length > 0 && (<div className={this.props.classes.card}>
                            <Card color="primary">
                                <CardItem
                                    text={el.text}
                                    division={el.link}
                                    link={`/contests/${this.props.match.params.contest}/${el.link}`}
                                    handleRoute={this.handleRoute}
                                    data={this.state.solved[el.link] ? this.state.solved[el.link] : []}
                                />
                            </Card>
                        </div>))
                    ))}

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" onClick={() => {
                            this.props.endContest({ name: this.props.match.params.contest }).then(() => {
                                this.props.history.push('end')
                            })
                        }}>End Contest</Button>
                    </div>
                </div>
                <Footer />
                <ToastContainer />
            </>
        )
    }
}
CotestSections.propTypes = {
    classes: PropTypes.object.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired
};

const mapStateToProps = (storeState) => {
    return {
        csolved: storeState.leaderboardeState.solved,
        msolved: storeState.leaderboardeState.solved,
        contestData: storeState.contestState.contest_data
    }
}

export default connect(mapStateToProps, { solvedChallenges, solvedMcqs, loadContest, endContest, contestStatus })(withStyles(styles, { withTheme: true })(withCookies(withRouter(CotestSections))))

