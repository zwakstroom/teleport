import React from 'react'
import { storiesOf } from '@storybook/react'
import ActionBar from './ActionBar'

let defaultProps = {
  isOpen: false,
  onClose: () => null,
  onOpenDownloadDialog: () => null,
  onOpenUploadDialog: () => null,
  termParams: '',
  title: 'test-node.companyxyz.internal.com',
}

storiesOf('Teleport/Terminal/ActionBar', module)
  .add('ActionBar', () => {
    const props = {
      ...defaultProps,
    }

    return (
      <ActionBar {...props} />
    );
  })
  .add('with disabled upload/download buttons', () => {
    const props = {
      ...defaultProps,
      isFileTransferDialogOpen: true,
    }

    return (
      <ActionBar {...props} />
    );
  });
