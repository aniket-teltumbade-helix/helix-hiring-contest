import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upcomingContests } from '../../redux/actions/contestActions'
import ContestCard from '../BasicCards/ContestCard'
import moment from 'moment'
import { Grid } from '@material-ui/core'

class UpcomingContests extends Component {
  componentDidMount() {
    this.props.upcomingContests()
  }
  render() {
    return this.props.loadData && this.props.loadData.length !== 0 ? (
      <>
        <Grid item md={3} style={{ display: 'flex' }}>
          {
            this.props.loadData.map(el => (
              <ContestCard data={el} uptime={moment(el.start_date).fromNow()} bgColor="secondary.main" />
            ))
          }
        </Grid>
      </>
    ) : null
  }
}

const mapStateToProps = storeState => {
  return { loadData: storeState.contestState.upcoming_contests }
}

export default connect(mapStateToProps, { upcomingContests })(UpcomingContests)
