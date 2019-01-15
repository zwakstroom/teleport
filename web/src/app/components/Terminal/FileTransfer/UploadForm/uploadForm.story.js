import React from 'react'
import { storiesOf } from '@storybook/react'
import UploadForm from './UploadForm'

const defaultProps = {
  onUpload: () => null
}

storiesOf('Teleport/Terminal/UploadForm', module)
  .add('UploadForm', () => {
    return (
      <UploadForm {...defaultProps} />
    );
  })
  .add('With selected files', () => <WithFiles />);


class WithFiles extends React.Component {
  componentDidMount() {
    const blobs = [
      { length: 4343 },
      { length: 4343 },
    ];

    this.ref.addFiles([], blobs)
  }

  render() {
    return (
      <UploadForm ref={e => this.ref = e} {...defaultProps} />
    )
  }
}

