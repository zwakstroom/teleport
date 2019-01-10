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

  container: (provided) => ({
    ...provided,
    height: '24px',
    lineHeight: '24px',
    width: '200px',
    padding: 0,
    position: 'absolute',
    top: "15px",
    marginLeft: "15px"
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

export default ClusterSelector;