import { DataGrid } from '@mui/x-data-grid'
import React, { Component } from 'react'

class BasicTable extends Component {
  render () {
    return (
      <div
        style={{
          height: this.props.height || '23vh',
          width: this.props.width || 'auto'
        }}
      >
        <DataGrid
          rows={this.props.rows}
          columns={this.props.columns}
          hideFooter={true}
          {...this.props}
        />
      </div>
    )
  }
}

export default BasicTable
