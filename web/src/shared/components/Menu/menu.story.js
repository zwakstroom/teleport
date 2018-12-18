import React from 'react'
import { storiesOf } from '@storybook/react'
import Menu from './Menu';
import MenuItem from './MenuItem';
import Button from '../Button';
import Box from '../Box';
import Flex from '../Flex';

storiesOf('Menu', module)
  .add('Simple menu', () => (
    <Flex justifyContent="space-between">
      <SimpleMenu text="Show to the right">
        <MenuItem>
          Test
        </MenuItem>
        <MenuItem>
          Test2
        </MenuItem>
      </SimpleMenu>
      <SimpleMenu text="Show in the center"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem>
          Test
        </MenuItem>
        <MenuItem>
            Test2
        </MenuItem>
        <MenuItem>
          <Button mt={1} mb={1} block> Logout</Button>
        </MenuItem>
      </SimpleMenu>
      <SimpleMenu text="Show to the left"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          Test
        </MenuItem>
        <MenuItem>
            Test2
        </MenuItem>
      </SimpleMenu>
    </Flex>
  )
);

class SimpleMenu extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = () => {
    this.setState({ anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { text, anchorOrigin, transformOrigin, children } = this.props;
    const { anchorEl } = this.state;
    return (
      <Box m={10} textAlign="center">
        <Button size="small" onClick={this.handleClickListItem}>
          {text}
        </Button>
        <Menu
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          { children }
        </Menu>
      </Box>
    );
  }
}