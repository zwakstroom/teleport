import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components';
import Dialog from './../Dialog';
import Box from './../Box';
import Heading from './../Heading';
import Button from './../Button';

storiesOf('Dialog', module)
  .add('Simple Dialog', () => (
    <div>
      <SampleDialog/>
    </div>
  ));

const DialogTitle = props => {
  const { children, onClose } = props;
  return (
    <StyledDialogTitle>
      <Heading.h4>
        {children}
      </Heading.h4>
      <Button size="sm" onClick={onClose} >
        Close Icon
      </Button>
    </StyledDialogTitle>
  );
};

const DialogContent = props => {
  return (
    <StyledDialogContent>
      {props.children}
    </StyledDialogContent>
  )
}

const DialogFooter = props => {
  return (
    <StyledDialogFooter>
      {props.children}
    </StyledDialogFooter>
  )
}


class SampleDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          Open dialog
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle onClose={this.handleClose}>
            Modal title
          </DialogTitle>
          <DialogContent>
            This is content
          </DialogContent>
          <DialogFooter>
            <Button onClick={this.handleClose} color="primary">
              Save changes
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

const StyledDialogTitle = styled(Box)`
  border-bottom: 1px solid;
`

const StyledDialogContent = styled(Box)`
  border-bottom: 1px solid;
`
const StyledDialogFooter = styled(Box)`
  border-bottom: 1px solid;
`