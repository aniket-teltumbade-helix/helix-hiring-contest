import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BasicDatePicker from '../../components/BasicDatePicker'
import BasicEditor from '../../components/BasicEditor'
import BasicTable from '../../components/BasicTable'
import { addContest } from '../../redux/actions/contestActions'
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
    modal: false
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
  selectChallenge = id => {
    this.setState({ challenges: [...this.state.challenges, id] })
  }
  componentDidMount() {
    this.props.ownChallenges()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.addContest({
      challenges: this.state.challenges.map(({ id, ...el }) => ({ ...el })),
      ...this.state
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
              <Typography component='span' variant='overline'>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => this.setState({ modal: true })}
                >
                  Add Challenges
                </Button>
                Challenges: {this.state.challenges.length}
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
                          this.setState({ challenges })
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
              <Button variant='contained' color='secondary' type='submit'>
                Add Contest
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    )
  }
}

const mapStateToProps = storeState => {
  return { challengeList: storeState.problemState.own_challenges }
}

export default connect(mapStateToProps, { ownChallenges, addContest })(
  CreateContest
)
