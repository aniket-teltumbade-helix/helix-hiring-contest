import { Typography, Button } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BasicTable from '../../components/BasicTable'
import { creatorContests } from '../../redux/actions/contestActions'

export class ViewChallenges extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    this.props.creatorContests()
    this.setState({
      data: []
    })
  }
  render() {
    console.log(this.props.loadData);
    return (
      <>
        <Typography
          component='h2'
          variant='h4'
          color='textSecondary'
          gutterBottom
        >
          Contests
        </Typography>
        <BasicTable
          width='100%'
          height='70vh'
          rows={
            this.props.loadData
              ? this.props.loadData.map(
                ({ _id, challenges, ...el }, index) => ({
                  id: index,
                  challenges: challenges.length,
                  ...el
                })
              )
              : []
          }
          columns={[
            { field: 'id', hide: true },
            { field: 'name', flex: 2 },
            { field: 'challenges', flex: 1 },
            { field: 'start_date', flex: 1 },
            { field: 'end_date', flex: 2 },
            {
              field: '',
              headerName: 'Action',
              disableClickEventBubbling: true,
              renderCell: params => {
                const onClick = () => {
                  const api = params.api
                  const fields = api.getAllColumns()
                  console.log(
                    params.row,
                    fields.map(c => c.field)
                  )
                }
                return <Button onClick={onClick}>Click</Button>
              },
              flex: 1
            }
          ]}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.contestState.admin_contests);
  return { loadData: state.contestState.admin_contests }
}

export default connect(mapStateToProps, { creatorContests })(ViewChallenges)
