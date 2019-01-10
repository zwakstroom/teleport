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
import Select from 'react-select';

class ClusterSelector extends React.Component {
  render() {
    const { value, options, onChange } = this.props;
    const selected = options.find(o => o.value === value);

    return (
        <Select
          styles={customStyles}
          value={selected}
          onChange={onChange}
          options={options}
        />
    );
  }
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'red' : 'blue',
  }),

  input: (provided) => ({
    ...provided,
    backgroundColor: 'red',
    color: 'rgba(255, 255, 255, .87)',
    margin: 0,
    padding: 0,
    width: '100%',
  }),

  singleValue: (provided) => ({
    ...provided,
    backgroundColor: 'yellow',
    color: 'rgba(255, 255, 255, .87)',
  }),

  dropdownIndicator: () => ({
    border: 'none',
    height: '24px',
    margin: '0',
    opacity: .56,
    width: '24px'
  }),

  valueContainer: () => ({
    backgroundColor: 'green',
    width: '100%',
  }),


  container: (provided) => ({
    ...provided,
    backgroundColor: 'teal',
    border: 'none',
    height: '24px',
    marginBottom: '40px',
    padding: '0',
    width: '200px',
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    border: 'none',
    background: 'orange',
    color: 'rgba(255, 255, 255, .87)',
    height: '24px',
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  }),

  control: (provided) => ({
    ...provided,
    border: 'none',
    background: 'magenta',
    color: 'rgba(255, 255, 255, .87)',
    height: '24px',
    lineHeight: '24px',
    minHeight: 'auto',
    width: '100%',
    padding: '0 24px 0 0',
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

export default ClusterSelector;