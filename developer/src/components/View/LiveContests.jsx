import React, { Component } from 'react'
import { connect } from 'react-redux'
import { liveContests } from '../../redux/actions/contestActions'
import ContestCard from '../BasicCards/ContestCard'
import moment from 'moment'
import { Grid } from '@material-ui/core'

class LiveContests extends Component {
  componentDidMount() {
    this.props.liveContests()
  }
  render() {
    console.log(this.props.loadData)
    return this.props.loadData && this.props.loadData.length !== 0 ? (
      <>
        {
          this.props.loadData.map(el => (
            <Grid item md={3} style={{ display: 'flex' }}>
              <ContestCard data={el} starttime={moment(el.start_date).fromNow()} bgColor="success.xLight" />
            </Grid>
          ))
        }
      </>
    ) : null
  }
}

const mapStateToProps = storeState => {
  return { loadData: storeState.contestState.live_contests }
}

export default connect(mapStateToProps, { liveContests })(LiveContests)
