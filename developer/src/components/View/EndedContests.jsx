import React, { Component } from 'react'
import { connect } from 'react-redux'
import { endedContests } from '../../redux/actions/contestActions'
import ContestCard from '../BasicCards/ContestCard'
import { Grid } from '@material-ui/core'
import moment from 'moment'

class EndedContests extends Component {
  componentDidMount() {
    this.props.endedContests()
  }
  render() {
    console.log(this.props.loadData)
    return this.props.loadData && this.props.loadData.length !== 0 ? (
      <>
        {
          this.props.loadData.map(el => (
            <Grid item md={3} style={{ display: 'flex' }}>
              <ContestCard data={el} endtime={moment(el.end_date).fromNow()} bgColor="error.xLight" />
            </Grid>
          ))
        }
      </>
    ) : null
  }
}

const mapStateToProps = storeState => {
  return { loadData: storeState.contestState.ended_contests }
}

export default connect(mapStateToProps, { endedContests })(EndedContests)
