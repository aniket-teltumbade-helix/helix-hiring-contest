import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography, 
  InputAdornment
} from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BasicDatePicker from '../../components/BasicDatePicker'
import BasicEditor from '../../components/BasicEditor'
import BasicTable from '../../components/BasicTable'
import { addContest } from '../../redux/actions/contestActions'
import { enlistMCQ } from '../../redux/actions/mcqActions'
import { ownChallenges } from '../../redux/actions/problemActions'


class CreateContest extends Component {
  state = {
    name: null,
    overview: null,
    start_date: new Date(),
    end_date: new Date(),
    tagline: '#contest',
    description: null,
    challenges: [],
    modal: false,
    modal2: false,
    mcqs: [],
    fileData: null,
    duration: null
  }
  componentDidMount() {
    this.props.ownChallenges()
    this.props.enlistMCQ()
  }
  handleOverview = e => {
    this.setState({ overview: e.editor.getData() })
  }
  handleDescription = e => {
    this.setState({ description: e.editor.getData() })
  }
  handleStart = e => {
    this.setState({ start_date: e._d })
  }
  handleEnd = e => {
    this.setState({ end_date: e._d })
  }
  handleName = e => {
    this.setState({ name: e.target.value })
  }
  handleDuration = e => {
    this.setState({duration: parseInt(e.target.value)})
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.addContest({
      challenges: this.state.challenges.map(({ id, ...el }) => ({ ...el })),
      mcqs: this.state.mcqs.map(({ id, ...el }) => ({ ...el })),
      ...this.state
    }).then(() => {
      this.setState({
        name: null,
        overview: null,
        start_date: new Date(),
        end_date: new Date(),
        description: null,
        challenges: [],
        mcqs: [],
        fileData: null,
        duration: null,
      })
    })
  }


  render() {
    return (
      <>
        <Typography
          component='h2'
          variant='h4'
          color='textSecondary'
          gutterBottom
        >
          Contest
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container wrap spacing={3}>
            <Grid item md={6}>
              <TextField
                label='Name'
                focused
                placeholder='Enter name of Contest'
                size='small'
                variant='outlined'
                fullWidth
                name='name'
                onChange={this.handleName}
              />
            </Grid>
            <Grid
              item
              md={6}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <BasicDatePicker
                date={this.state.start_date}
                handleDateChange={this.handleStart}
                label='Start Date'
              />
              <BasicDatePicker
                date={this.state.end_date}
                handleDateChange={this.handleEnd}
                label='End Date'
              />
              <TextField
              label='Duration'
              placeholder='Enter duration of Contest'
              size='small'
              variant='outlined'
              name='duration'
              type='number'
              onChange={this.handleDuration}
              InputProps={{
                endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
              }}/>
            </Grid>
            <Grid item md={6}>
              <Typography component='label'>
                Overview
                <BasicEditor name='overview' logEvent={this.handleOverview} />
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography component='label'>
                Description
                <BasicEditor
                  name='description'
                  logEvent={this.handleDescription}
                />
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography component='span' variant='overline' style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => this.setState({ modal: true })}
                >
                  Add Challenges
                </Button>
                <span>
                  <strong>Challenges:</strong>
                  {this.state.challenges.length}({this.state.c_points})
                </span>
              </Typography>
              <Dialog
                open={this.state.modal}
                onClose={() => this.setState({ modal: false })}
                fullWidth
              >
                <DialogTitle>Challenege List</DialogTitle>
                <DialogContent>
                  <Box>
                    {this.props.challengeList ? (
                      <BasicTable
                        rows={this.props.challengeList.map((el, index) => ({
                          id: el._id,
                          Name: el.name,
                          Points: el.points,
                          Level: el.level
                        }))}
                        columns={[
                          { field: 'id', flex: 1, hide: true },
                          { field: 'Name', flex: 3 },
                          { field: 'Points', flex: 2 },
                          { field: 'Level', flex: 2 }
                        ]}
                        height='50vh'
                        checkboxSelection
                        onSelectionModelChange={challenges => {
                          let pts = challenges.map((el, ind) => this.props.challengeList[ind].points).reduce((acc, el) => {
                            return acc + el
                          })
                          this.setState({ challenges, c_points: pts })
                        }}
                        selectionModel={this.state.challenges}
                      />
                    ) : null}
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() =>
                      this.setState({ modal: false, challenges: [] })
                    }
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => this.setState({ modal: false })}>
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
              <Typography component='span' variant='overline' style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => this.setState({ modal2: true })}
                >
                  Add MCQs
                </Button>
                <span>
                  <strong>MCQs:</strong>
                  {this.state.mcqs.length}({this.state.m_points})
                </span>
              </Typography>
              <Dialog
                open={this.state.modal2}
                onClose={() => this.setState({ modal2: false })}
                fullWidth
              >
                <DialogTitle>MCQ List</DialogTitle>
                <DialogContent>
                  <Box>
                    {this.props.mcqList ? (
                      <BasicTable
                        rows={this.props.mcqList.map((el, index) => ({
                          id: el._id,
                          Name: el.name,
                          Description: el.description,
                          Points: el.points,
                          A: el.options[0].option,
                          B: el.options[1].option,
                          C: el.options[2].option,
                          D: el.options[3].option,
                        }))}
                        columns={[
                          { field: 'id', flex: 1, hide: true },
                          { field: 'Name', flex: 2 },
                          { field: 'Description', flex: 3 },
                          { field: 'Points', flex: 1 },
                        ]}
                        height='50vh'
                        checkboxSelection
                        onSelectionModelChange={mcqs => {
                          let pts = mcqs.map((el, ind) => this.props.mcqList[ind].points).reduce((acc, el) => {
                            return acc + el
                          })
                          this.setState({ mcqs, m_points: pts })
                        }}
                        selectionModel={this.state.mcqs}
                      />
                    ) : null}
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() =>
                      this.setState({ modal2: false, mcqs: [] })
                    }
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => this.setState({ modal2: false })}>
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
              <Typography component='span' variant='overline' style={{ display: 'flex', flexDirection: 'column' }}>
                <Button variant='contained' color='secondary' type='submit'>
                  Add Contest
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </>
    )
  }
}

const mapStateToProps = storeState => {
  return {
    challengeList: storeState.problemState.own_challenges,
    mcqList: storeState.mcqState.list
  }
}

export default connect(mapStateToProps, { ownChallenges, addContest, enlistMCQ })(
  CreateContest
)
