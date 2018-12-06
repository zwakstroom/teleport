import React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from './';

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

  render() {
    const { hidden } = this.state;
    return (
      <Dropdown>
        <button onClick={this.onClick} >
          Dropdown Button
        </button>
        <DropdownMenu hidden={hidden}>
          <DropdownItem onClick={() => window.alert('hello')}>Action</DropdownItem>
          <DropdownItem>Another action</DropdownItem>
          <DropdownItem>Something else here</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}