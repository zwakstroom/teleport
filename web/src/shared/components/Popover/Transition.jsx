import React from 'react'
import ReactDOM from 'react-dom'

class Transition extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this)
    this.props.onEntering(node);
  }

  render() {
    const { children, ...childProps } = this.props
    delete childProps.onEntering;

    const child = React.Children.only(children)
    return React.cloneElement(child, childProps)
  }
}


export default Transition