import React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from './';
import Button from '../Button'

export class DropdownButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
  }

  onClick = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  signOut = () => {
    alert('Sign Out')
  }

  render() {
    const { hidden } = this.state;
    return (
      <Dropdown>
        <button onClick={this.onClick} >
          Dropdown Button
        </button>
        <DropdownMenu location="left" hidden={hidden}>
          <DropdownItem onClick={() => window.alert('hello')}>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>

          <Button mt={2} block onClick={this.signOut}>Sign Out</Button>
        </DropdownMenu>
      </Dropdown>
    );
  }
}