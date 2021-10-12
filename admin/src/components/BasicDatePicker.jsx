import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import React, { Component } from 'react'

export class BasicDatePicker extends Component {
  render () {
    return (
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <DateTimePicker
          value={this.props.date}
          onChange={this.props.handleDateChange}
          inputVariant='outlined'
          size='small'
          label={this.props.label}
        />
      </MuiPickersUtilsProvider>
    )
  }
}

export default BasicDatePicker
