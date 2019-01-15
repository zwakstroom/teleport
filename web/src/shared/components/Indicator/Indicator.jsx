import React from "react";
import styled from 'styled-components'
import { Spinner as SpinnerIcon} from './../Icon';
import './../../assets/icomoon/style.css';

const WHEN_TO_DISPLAY = 100; // 0.2s;

class Indicator extends React.Component {

  constructor(props) {
    super(props);
    this._timer = null;
    this.state = {
      canDisplay: false
    }
  }

  componentDidMount() {
    this._timer = setTimeout(() => {
      this.setState({
        canDisplay: true
      })
    }, WHEN_TO_DISPLAY);
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  render() {
    if (!this.state.canDisplay) {
      return null;
    }

    return (
      <StyledSpinner {...this.props}/>
    )
  }
}

const StyledSpinner = styled(SpinnerIcon)`
  animation: anim-rotate 2s infinite linear;
  color: #fff;
  display: inline-block;
  font-size: 32px;
  height: 32px;
  width: 32px;
  line-height: 32px;
  margin: 16px;
  text-shadow: 0 0 .25em rgba(255,255,255, .3);

  @keyframes anim-rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`;

export default Indicator;