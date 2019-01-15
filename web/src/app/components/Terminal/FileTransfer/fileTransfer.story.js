import React from 'react'
import { storiesOf } from '@storybook/react'
import FileTransfer from './FileTransfer'
import { FileTransferStore, File } from 'app/flux/fileTransfer/store';
import { Downloader } from 'app/services/fileTransfer';

const defaultProps = {
  onTransfer: () => null,
  onClose: () => null,
  onTransferRemove: () => null,
  onTransferUpdate: () => null,
  onTransferStart: () => null,
  store: new FileTransferStore({
    isOpen: true,
    login: "root",
    serverId: "1d8d5c80-d74d-43bc-97e4-34da0554ff57",
    siteId: "one",
  })
}

const defaultFile = {
  location: "~test",
  id: "1547581437406~/test",
  url: "/v1/webapi/sites/one/nodes/",
  name: "~/test",
  blob: [],
}

storiesOf('Teleport/Terminal/FileTransfer', module)
  .add('with download error', () => {
    const props = makeProps({
      isUpload: false,
      isFailed: true,
      error: "stat /root/test: no such file or directory"
    });

    return (
      <MockDownloader>
        <FileTransfer {...props} />
      </MockDownloader>
    );
  })
  .add('with download progress', () => {
    const props = makeProps({
      isUpload: false,
      isProcessing: true,
    });

    return (
      <MockDownloader>
        <FileTransfer {...props} />
      </MockDownloader>
    );
  })
  .add('with download completed', () => {
    const props = makeProps({
      isUpload: false,
      isCompleted: true,
    })

    return (
      <MockDownloader>
        <FileTransfer {...props} />
      </MockDownloader>
    );
  })
  .add('with upload', () => {
    const props = {
      ...defaultProps,
      store: new FileTransferStore({ isOpen: true, isUpload: true })
    }

    return (
      <MockDownloader>
        <FileTransfer {...props} />
      </MockDownloader>
    );
  });

const makeProps = json => {
  const file = new File({
    ...defaultFile,
    ...json
  });

  const props = {
    ...defaultProps,
  }

  props.store = props.store.update('files',
    files => files.set(file.id, file))

  return props;
};

class MockDownloader extends React.Component {
  constructor(props) {
    super(props);
    this.original = Downloader.prototype.do
    Downloader.prototype.do = () => null;
  }

  componentWillUnmount() {
    Downloader.prototype.do = this.original;
  }

  render() {
    return this.props.children;
  }
}