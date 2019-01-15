import React from 'react'
import { storiesOf } from '@storybook/react'
import DownloadForm from './DownloadForm'

storiesOf('Teleport/Terminal/DownloadForm', module)
  .add('DownloadForm', () => {
    return (
      <DownloadForm
        onDownload={ () => null }
      />
    );
  });
