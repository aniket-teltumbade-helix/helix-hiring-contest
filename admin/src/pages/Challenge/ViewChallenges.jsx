import { Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BasicTable from '../../components/BasicTable'
import { ownChallenges } from '../../redux/actions/problemActions'

export class ViewChallenges extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    this.props.ownChallenges()
    this.setState({
      data: []
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
          Challenges
        </Typography>
        <BasicTable
          width='100%'
          height='70vh'
          rows={
            this.props.loadData
              ? this.props.loadData.map(
                ({ _id, samples, test_cases, ...el }, index) => ({
                  id: index,
                  samples: samples.length,
                  test_cases: test_cases.length,
                  ...el
                })
              )
              : []
          }
          columns={[
            { field: 'id', hide: true },
            { field: 'name', flex: 2 },
            { field: 'samples', flex: 1 },
            { field: 'test_cases', flex: 1 },
            { field: 'level', flex: 2 },
            { field: 'points', flex: 1 }
          ]}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return { loadData: state.problemState.own_challenges }
}

export default connect(mapStateToProps, { ownChallenges })(ViewChallenges)
