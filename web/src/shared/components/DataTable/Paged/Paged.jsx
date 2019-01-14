/*
Copyright 2018 Gravitational, Inc.

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
import styled from 'styled-components'

import classnames from 'classnames';
import { Table } from './../Table';
import * as Icon from 'shared/components/Icon';

class PagedTable extends React.Component {

  onPrev = () => {
    let { startFrom, pageSize } = this.state;

    startFrom = startFrom - pageSize;

    if( startFrom < 0){
      startFrom = 0;
    }

    this.setState({
      startFrom
    })

  }

  onNext = () => {
    const { data=[] } = this.props;
    const { startFrom, pageSize } = this.state;
    let newStartFrom = startFrom + pageSize;

    if( newStartFrom < data.length){
      newStartFrom = startFrom + pageSize;
      this.setState({
        startFrom: newStartFrom
      })
    }
  }

  constructor(props) {
    super(props);
    const { pageSize = 7 } = this.props;
    this.state = {
      startFrom: 0,
      pageSize
    }
  }

  render(){
    const { startFrom, pageSize } = this.state;
    const { data=[] } = this.props;
    const totalRows = data.length;

    let endAt = 0;
    let pagedData = data;

    if (data.length > 0){
      endAt = startFrom + (pageSize > data.length ? data.length : pageSize);

      if(endAt > data.length){
        endAt = data.length;
      }

      pagedData = data.slice(startFrom, endAt);
    }

    const tableProps = {
      ...this.props,
      rowCount: pagedData.length,
      data: pagedData
    }

    const infoProps = {
      pageSize,
      startFrom,
      endAt,
      totalRows
    }

    const pager = <PageInfo {...infoProps} onPrev={this.onPrev} onNext={this.onNext} />;

    return (
      <Table {...tableProps} topbar={pager} footer={pager} />
    )
  }
}

const PageInfo = props => {
  const {startFrom, endAt, totalRows, onPrev, onNext, pageSize} = props;
  const shouldBeDisplayed = totalRows > pageSize;

  if(!shouldBeDisplayed){
    return null;
  }

  const prevBtnClass = classnames('btn btn-white', {
    'disabled': startFrom === 0
  });

  const nextBtnClass = classnames('btn btn-white', {
    'disabled': endAt === totalRows
  });

  return (
    <Pager>
      <h5>
        SHOWING <strong>{startFrom+1}</strong> to <strong>{endAt}</strong> of <strong>{totalRows}</strong>
      </h5>

      <ul>
        <li>
          <button onClick={onPrev} title="Previous Page" className={prevBtnClass}>
            <Icon.CircleArrowLeft fontSize="3" />
          </button>
        </li>

        <li>
          <button onClick={onNext} title="Next Page" className={nextBtnClass}>
            <Icon.CircleArrowRight fontSize="3" />
          </button>
        </li>
      </ul>
    </Pager>
  )
}

export default PagedTable;

const Pager = styled.nav`
  display: flex;
  margin: 0;
  height: 24px;
  line-height: 24px;
  padding: 0;

  h5 {
    font-size: 11px;
    font-weight: 300;
    line-height: 24px;
    margin: 0;
    opacity: .87;
    padding: 0;
    width: 40%;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 60%;
    text-align: right;

    li {
      display: inline-block;
    }
  }

  button {
    background: none;
    border: none;
    border-radius: 200px;
    cursor: pointer;
    height: 24px;
    padding: 0;
    margin: 0 2px;
    min-width: 24px;
    outline: none;
    transition: all .3s;

    &:hover {
      background: ${props => props.theme.colors.bgQuaternary };

      .icon {
        opacity: 1;
      }
    }

    .icon {
      opacity: .56;
      transition: all .3s;
    }
  }
`;
