import React from 'react'
import styled from 'styled-components';
import { storiesOf } from '@storybook/react'
import Popover from './../Popover';
import Button from '../Button';
import Box from '../Box';
import Flex from '../Flex';
import Text from '../Text';

storiesOf('Popover', module)
  .add('Simple Popover', () => (
    <Box m={10} textAlign="center">
      <SimplePopover />
    </Box>
  ))
  .add('Simple Mouse on hover', () => (
    <Box m={10} textAlign="center">
      <MouseOverPopover />
    </Box>
  ));

class SimplePopover extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = () => {
    this.setState({
      anchorEl: this.btnRef,
    });
  }

  topCenter = () => {
    this.setState({
      anchorEl: this.btnRef,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      transformOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      }
    })
  }

  left = () => {
    this.setState({
      anchorEl: this.btnRef,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }
    })
  }

  right = () => {
    this.setState({
      anchorEl: this.btnRef,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
      }
    })
  }

  bottomCenter = () => {
    this.setState({
      anchorEl: this.btnRef,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
      }
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  }

  render() {
    const { anchorEl, anchorOrigin, transformOrigin } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Box>
          <Button mt={6} ref={e => this.btnRef = e} >
            Open Popover
          </Button>
          <Popover
            id="simple-popper"
            open={open}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            anchorEl={anchorEl}
            onClose={this.handleClose}
          >
            <Box bg="white" color="black" p={5}>
              The content of the Popover.
            </Box>
          </Popover>
        </Box>
        <Flex m={10} justifyContent="space-around">
          <Button size="small" onClick={this.left}>
            Left
          </Button>
          <Button size="small" onClick={this.right}>
            Right
          </Button>
          <Button size="small" onClick={this.topCenter}>
            Top Center
          </Button>
          <Button size="small" onClick={this.bottomCenter}>
            Bottom Center
          </Button>
        </Flex>
      </div>
    );
  }
}

class MouseOverPopover extends React.Component {
  state = {
    anchorEl: null,
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <Flex justifyContent="center">
        <Box
          style={{height: "200", width: "200px"}}
        >
          <Text
            aria-owns={open ? 'mouse-over-popover' : undefined}
            onMouseEnter={this.handlePopoverOpen}
            onMouseLeave={this.handlePopoverClose}
          >
              Hover with a Popover.
          </Text>
        </Box>
        <Popover
          modalCss={modalCss}
          onClose={this.handlePopoverClose}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <StyledOnHover p={1}>Sample popover text. (tooltip)</StyledOnHover>
        </Popover>
      </Flex>
    );
  }
}

const modalCss = () => `
  pointer-events: none;
`

const StyledOnHover = styled(Text)`
  background-color: white;
  color: black;
`