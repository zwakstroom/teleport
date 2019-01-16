/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import Slider from './Slider';
import styled from 'styled-components';
import { Text, Button } from 'shared/components';
import * as Icons from 'shared/components/Icon';
import { fonts } from 'shared/components/theme';

export default class ProgressBar extends React.Component {
  render() {
    const { isPlaying, min, max, value, onChange, onToggle, time } = this.props;
    const Icon = isPlaying ? Icons.Play : Icons.CircleStop;
    return (
      <StyledProgessBar>
        <Button size="small" onClick={onToggle}>
          <Icon />
        </Button>
        <TimeText >{time}</TimeText>
        <SliderContainer>
          <Slider
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            defaultValue={1}
            withBars
            className="grv-slider" />
        </SliderContainer>
      </StyledProgessBar>
    )
  }
}

const SliderContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const TimeText = styled(Text)`
  font-family: ${fonts.mono};
`

const StyledProgessBar = styled.div`
  margin-top: 10px;
  display: flex;
  color: #ddd;


  .grv-slider{
    display: block;
    height: 10px;
    padding: 0;
    margin-top: 4px;
    height: 30px;
    padding: 3px;
  }

  .grv-slider .bar{
    height: 5px;
  }

  .grv-slider .handle{
    width: 14px;
    height: 14px;
    left: -10px;
    top: -4px;
    z-index: 1;
    border-radius: 14px;
    background: #FFF;
    box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #EBEBEB, 0 3px 6px -3px #BBB;
  }

  .grv-slider .bar-0{
    background: none repeat scroll 0 0 #bbbbbb;
    box-shadow: none;
  }

  .grv-slider .bar-1{
    background-color: #333;
  }



`

/*

.grv-session-player-controls{
    margin-top: 10px;
    display: flex;
    color: #ddd;

    .grv-flex-column{
      align-self: center;
    }

    .btn{
      width: 15px;
      background-color: transparent;
      padding: 0 12px 0 0;

      &:focus, &:hover{
        color: #ddd;
      }
    }

    .grv-session-player-controls-time{
      min-width: 40px;
      margin: 2px 10px 0 7px;
      display: block;
      font-family: $grv-font-mono;
    }

    .grv-slider{
      display: block;
      height: 10px;
      padding: 0;
      margin-top: 4px;
    }
  }

*/