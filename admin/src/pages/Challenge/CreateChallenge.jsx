import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BasicEditor from '../../components/BasicEditor'
import BasicInputOutput from '../../components/BasicInputOutput'
import BasicTable from '../../components/BasicTable'
import { addChallenge } from '../../redux/actions/problemActions'

export class CreateChallenge extends Component {
  state = {
    name: null,
    description: null,
    samples: [],
    test_cases: [],
    level: null,
    points: 5,
    languages: null,
    sampleModal: false,
    testCasesModal: false
  }
  handleSamples = async (data, type) => {
    this.setState(prevState => ({
      samples: [...prevState[type], data],
      sampleModal: false
    }))
  }
  handleTests = async (data, type) => {
    this.setState(prevState => ({
      test_cases: [...prevState[type], data],
      testCasesModal: false
    }))
  }
  handleDesc = e => {
    this.setState({ description: e.editor.getData() })
  }
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.addChallenge(this.state)
    e.target.reset()
  }
  componentDidMount() { }
  render() {
    return (
      <>
        <Typography
          component='h2'
          variant='h4'
          color='textSecondary'
          gutterBottom
        >
          Challenge
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container wrap spacing={3}>
            <Grid item md={8}>
              <Grid container direction='column' spacing={3}>
                <Grid item>
                  <TextField
                    label='Name'
                    placeholder='Enter name of Contest'
                    size='medium'
                    name='name'
                    onChange={this.handleInput}
                    variant='outlined'
                    focused
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Typography component='label'>
                    Description
                    <BasicEditor
                      name='description'
                      logEvent={this.handleDesc}
                    />
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <TextField
                      label='Points'
                      type='number'
                      variant='outlined'
                      name='points'
                      onChange={this.handleInput}
                      defaultValue='5'
                      InputProps={{
                        inputProps: {
                          min: 5,
                          max: 50,
                          step: 5
                        }
                      }}
                      step='5'
                      min='5'
                      max='40'
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6}>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id='level-label'>Level</InputLabel>
                        <Select
                          variant='outlined'
                          name='level'
                          onChange={this.handleInput}
                          labelId='level-label'
                          id='level'
                          label='Level'
                          defaultValue='Advanced'
                        >
                          <MenuItem value='Newbie'>Newbie</MenuItem>
                          <MenuItem value='Novice'>Novice</MenuItem>
                          <MenuItem value='Rookie'>Rookie</MenuItem>
                          <MenuItem value='Beginner'>Beginner</MenuItem>
                          <MenuItem value='Talented'>Talented</MenuItem>
                          <MenuItem value='Skilled'>Skilled</MenuItem>
                          <MenuItem value='Intermediate'>Intermediate</MenuItem>
                          <MenuItem value='Skillful'>Skillful</MenuItem>
                          <MenuItem value='Seasoned'>Seasoned</MenuItem>
                          <MenuItem value='Proficient'>Proficient</MenuItem>
                          <MenuItem value='Experienced'>Experienced</MenuItem>
                          <MenuItem value='Advanced'>Advanced</MenuItem>
                          <MenuItem value='Senior'>Senior</MenuItem>
                          <MenuItem value='Expert'>Expert</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4}>
              <Grid
                item
                md={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='subtitle2' component='b'>
                  Samples
                </Typography>
                <IconButton
                  color='primary'
                  aria-label='add to shopping cart'
                  onClick={() => this.setState({ sampleModal: true })}
                >
                  <AddCircleOutline />
                </IconButton>
                <BasicInputOutput
                  handleIOData={this.handleSamples}
                  type='samples'
                  name='Sample'
                  open={this.state.sampleModal}
                  handleClose={status => {
                    this.setState({ sampleModal: status })
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <BasicTable
                  rows={this.state.samples
                    .map((el, index) => {
                      return { id: index + 1, ...el }
                    })
                    .reverse()}
                  columns={[
                    { field: 'id', headerName: 'ID', flex: 1 },
                    { field: 'input', headerName: 'Input', flex: 2 },
                    { field: 'output', headerName: 'Output', flex: 2 }
                  ]}
                />
              </Grid>
              <Grid
                item
                md={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='subtitle2' component='b'>
                  Test Cases
                </Typography>
                <IconButton
                  color='primary'
                  aria-label='add to shopping cart'
                  onClick={() => this.setState({ testCasesModal: true })}
                >
                  <AddCircleOutline />
                </IconButton>
                <BasicInputOutput
                  handleIOData={this.handleTests}
                  type='test_cases'
                  name='Test Case'
                  open={this.state.testCasesModal}
                  handleClose={status =>
                    this.setState({ testCasesModal: status })
                  }
                />
              </Grid>
              <Grid item md={12}>
                <BasicTable
                  rows={this.state.test_cases
                    .map((el, index) => {
                      return { id: index + 1, ...el }
                    })
                    .reverse()}
                  columns={[
                    { field: 'id', headerName: 'ID', flex: 1 },
                    { field: 'input', headerName: 'Input', flex: 2 },
                    { field: 'output', headerName: 'Output', flex: 2 }
                  ]}
                />
              </Grid>
            </Grid>
            <Grid
              item
              md={12}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button type='submit'>Submit</Button>
            </Grid>
          </Grid>
        </form>
      </>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { addChallenge })(CreateChallenge)
