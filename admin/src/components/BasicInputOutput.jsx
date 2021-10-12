import {
  Box,
  Button,
  Grid,
  Dialog,
  TextareaAutosize,
  Typography,
  DialogContent,
  DialogActions
} from '@material-ui/core'
import React, { Component, createRef } from 'react'

export class BasicInputOutput extends Component {
  state = {
    input: null,
    output: null
  }
  constructor (props) {
    super(props)
    this.iref = createRef()
    this.oref = createRef()
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handelClick = () => {
    this.props.handleIOData(this.state, this.props.type)
    this.setState({
      input: null,
      output: null
    })
    this.oref.current.value = ''
    this.iref.current.value = ''
  }
  render () {
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby='Dialog-Dialog-title'
        aria-describedby='Dialog-Dialog-description'
      >
        <DialogContent>
          <Box>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography>
                  {this.props.name} Input
                  <TextareaAutosize
                    name='input'
                    minRows={4}
                    aria-label='maximum height'
                    placeholder='Maximum 4 rows'
                    style={{ width: '100%' }}
                    onChange={this.handleInput}
                    ref={this.iref}
                    label={`${this.props.type.toUpperCase()} Input`}
                  />
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography>
                  {this.props.name} Output
                  <TextareaAutosize
                    name='output'
                    minRows={4}
                    aria-label='maximum height'
                    placeholder='Maximum 4 rows'
                    style={{ width: '100%' }}
                    onChange={this.handleInput}
                    ref={this.oref}
                    label={`${this.props.type.toUpperCase()} Output`}
                  />
                </Typography>
              </Grid>
              <Grid item md={12} align='right'></Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.props.handleClose(false)}
            variant='outlined'
          >
            Close
          </Button>
          <Button onClick={this.handelClick} variant='outlined'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default BasicInputOutput
