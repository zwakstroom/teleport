import React from "react";
import styled from 'styled-components'

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
      <StyledSpinner viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="2"
        />
      </StyledSpinner>
    )
  }
}

const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  margin: 40px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default Indicator;




