import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from './ProgressBar';

storiesOf('Teleport/Player/ProgressBar', module)
  .add('ProgressBar (playing)', () => {
    return (
      <SampleProgressbar isPlaying={true} />);
  })
  .add('ProgressBar (stopped)', () => {
    return (
      <SampleProgressbar isPlaying={false} />);
  });

class SampleProgressbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
      min: 1,
      max: 200,
      value: 1,
      time: '12:12',
      ...props
    }
  }

  onChange = (value) => {
    this.setState({
      value
    })
  }

  render() {
    const props = {
      ...this.state,
      onChange: this.onChange,
      onToggle: () => null,
    }

    return (
      <ProgressBar {...props} />);
  }
}
