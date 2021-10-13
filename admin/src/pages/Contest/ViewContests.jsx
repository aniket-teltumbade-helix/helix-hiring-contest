import {
  Typography, Button, Dialog, DialogContent, DialogTitle
} from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BasicTable from '../../components/BasicTable'
import { loadContacts } from '../../redux/actions/contactActions'
import { contestInvite, creatorContests } from '../../redux/actions/contestActions'

export class ViewChallenges extends Component {
  state = {
    data: null,
    modal: false
  }
  handleClose = () => {
    this.setState({
      data: null,
      modal: false
    })
  }
  componentDidMount() {
    this.props.creatorContests()
    this.props.loadContacts()
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
                  this.setState({ data: params.row, modal: true });
                }
                return <Button onClick={onClick}>Click</Button>
              },
              flex: 1
            }
          ]}
        />
        <Dialog open={this.state.modal}
          onClose={this.handleClose}>
          <DialogContent>
            <DialogTitle>Contacts</DialogTitle>
            {this.props.contacts &&
              <BasicTable
                rows={this.props.contacts.msg.map((el) => ({ ...el, id: el._id }))}
                columns={[
                  { field: "id", hide: true, },
                  { field: "full_name", flex: 1 },
                  {
                    field: "",
                    disableClickEventBubbling: true,
                    renderCell: params => {
                      const onClick = () => {
                        let { full_name, email } = params.row
                        let { name, start_date, end_date } = this.state.data
                        this.props.contestInvite(full_name, email, name, start_date, end_date );
                      }
                      return <Button onClick={onClick}>Click</Button>
                    }
                  }]}
                width="300px"
                height="200px"
              />}
          </DialogContent>
        </Dialog>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    loadData: state.contestState.admin_contests,
    contacts: state.contactState.view_contact
  }
}

export default connect(mapStateToProps, { creatorContests, loadContacts, contestInvite })(ViewChallenges)
