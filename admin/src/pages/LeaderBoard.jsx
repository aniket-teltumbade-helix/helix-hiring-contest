import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Box
} from "@material-ui/core";
import { creatorContests } from '../redux/actions/contestActions';
import { contestLeaderboard } from '../redux/actions/leaderboardActions';
import BasicTable from '../components/BasicTable';


class LeaderBoard extends Component {
    state = {
        contest: '',
    }
    componentDidMount() {
        this.props.creatorContests()
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        this.props.contestLeaderboard({ contest: event.target.value })
    }
    render() {
        console.log(this.props);
        return (
            <Box sx={{ width: "100vw" }}>
                {this.props.loadContest ? <FormControl variant="outlined" size="small">
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-simple"
                    >
                        Contest
                    </InputLabel>
                    <Select noGutter
                        // defaultValue={this.state.contest}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                name="contest"
                                id="outlined-age-simple"
                            />
                        }
                    >
                        {
                            this.props.loadContest.map(el => <MenuItem value={el.name}>{el.name}</MenuItem>)
                        }
                    </Select>
                </FormControl> : null}
                {this.props.loadRank && (
                    <BasicTable
                        width='100%'
                        height='70vh'
                        rows={this.props.loadRank.map((el, index) => ({ ...el.users, id: index }))}
                        columns={[{ field: "id", flex: 1 }, { field: "user", flex: 1 }, { field: "points", flex: 1 }]}
                    />
                )}
            </Box>
        )
    }
}

const mapStateToProps = (storeState) => {
    return { loadContest: storeState.contestState.admin_contests, loadRank: storeState.leaderboardeState.contest_leaderboard }
}

export default connect(mapStateToProps, { creatorContests, contestLeaderboard })(LeaderBoard)
