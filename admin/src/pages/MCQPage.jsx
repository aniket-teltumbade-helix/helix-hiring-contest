import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { Box, Typography, IconButton, Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import BasicTable from '../components/BasicTable'
import { addMCQ, enlistMCQ } from '../redux/actions/mcqActions'

class MCQPage extends Component {
  state = {
    open: false,
    mcqs: [],
    temp: []
  }
  handleAdd = () => {
    this.props.addMCQ(this.state.mcqs.map(el => this.state.temp[el]))
  }
  handleMcq = (e) => {
    console.log(e.target.files[0]);
    var fr = new FileReader();
    fr.onload = () => {
      let arr = []
      let dataOpt = { "A": 0, "B": 1, "C": 2, "D": 3 }
      let row = fr.result.split('\n')
      row.forEach((column, index) => {
        let fields = {}
        if (index !== 0) {
          column.split(',').forEach((field, idx) => {
            if (idx === 0) {
              fields["name"] = field
            }
            else if (idx === 1) {
              fields["description"] = field
            }
            else if (idx > 1 && idx < 6) {
              if (!fields.options) {
                fields["options"] = []
              }
              fields["options"][idx - 2] = { option: field, answer: false }
            }
            else if (idx === 6) {
              let dataid = dataOpt[field]
              fields["options"][dataid] = { ...fields["options"][dataid], answer: true }
            }
            else {
              fields["points"] = parseInt(field)
            }
          })
          arr.push(fields)
        }
      });
      arr.pop()
      this.setState({ temp: [...arr] })
    }
    fr.readAsText(e.target.files[0])
  }

  componentDidMount() {
    this.props.enlistMCQ()
  }
  handelDownload() {
    const blob = new Blob(['name,description,a,b,c,d,correct,points'])
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'sample.csv';
    a.click();
  }
  fileRef = createRef()
  render() {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component="h2"
            variant="h4"
            color="textSecondary"
            gutterBottom
          >
            Multiple Choice Questions
          </Typography>
          <IconButton onClick={() => this.setState({ open: true })}>
            <Add />
          </IconButton>
        </Box>
        <Box>
          {this.props.mcqList ? (
            <BasicTable
              rows={this.props.mcqList.map(el => ({ id: el._id, ...el }))}
              columns={
                [
                  { field: "id", hide: true },
                  { field: "name", headerName: "Name", flex: 1 },
                  { field: "description", headerName: "Description", flex: 3 },
                  { field: "points", headerName: "points" }
                ]
              }
              height="80vh"
            />
          ) : null}
        </Box>
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          aria-labelledby="Dialog-Dialog-title"
          aria-describedby="Dialog-Dialog-description"
          fullWidth
          maxWidth="lg"
        >
          <DialogContent>
            <DialogTitle>Add Question</DialogTitle>
            <Box>
              <BasicTable
                rows={this.state.temp
                  .map((el, index) => ({
                    id: index,
                    Name: el.description,
                    A: el.options[0].option,
                    B: el.options[1].option,
                    C: el.options[2].option,
                    D: el.options[3].option,
                    Correct: el.options.filter(ele => ele.answer === true)[0].option,
                    Points: el.points,
                  }))
                }
                columns={[
                  { field: 'id', flex: 1, hide: true },
                  { field: 'Name', flex: 3 },
                  { field: 'A', flex: 1 },
                  { field: 'B', flex: 1 },
                  { field: 'C', flex: 1 },
                  { field: 'D', flex: 1 },
                  { field: 'Correct', flex: 1 },
                  { field: 'Points', flex: 1 },
                ]}
                checkboxSelection
                onSelectionModelChange={mcqs => {
                  this.setState({ mcqs })
                }}
                selectionModel={this.state.mcqs}
                height='50vh'
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button component="a" onClick={this.handelDownload}>Sample</Button>
            <Button onClick={() => this.fileRef.current.click()}>Upload</Button>
            <Button onClick={this.handleAdd}>Add</Button>
            <Button onClick={() => this.setState({ open: false, mcqs: [] })}>Close</Button>
            <input type='file' ref={this.fileRef} style={{ display: 'none' }} onChange={this.handleMcq}></input>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

const mapStateToProps = (storestate) => {
  return { mcqList: storestate.mcqState.list }
}

export default connect(mapStateToProps, { addMCQ, enlistMCQ })(MCQPage)
