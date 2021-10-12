import { CKEditor } from 'ckeditor4-react'
import React, { Component } from 'react'

export class BasicEditor extends Component {
  render () {
    return (
      <CKEditor
        initData={<p>Write Something Here.</p>}
        config={{
          toolbar: [
            ['Source'],
            ['Styles', 'Format', 'Font', 'FontSize'],
            ['Bold', 'Italic'],
            ['Undo', 'Redo'],
            ['EasyImageUpload', 'Table']
          ],
          extraPlugins: 'easyimage',
          removePlugins: 'image',
          cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
          cloudServices_tokenUrl:
            'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
        }}
        onChange={this.props.logEvent}
        onSelectionChange={this.props.logEvent}
        name={this.props.name}
        type='classic'
        style={{
          minHeight: this.props.height ? this.props.height : 'auto'
        }}
      />
    )
  }
}

export default BasicEditor
