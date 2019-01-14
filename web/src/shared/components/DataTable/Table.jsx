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
import { StyledTable, StyledEmptyIndicator } from './StyledTable';
import * as Icons from './../Icon/Icon';

/**
* Sort indicator used by SortHeaderCell
*/
const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC'
};

class Table extends React.Component {
  renderHeader(children) {
    const { data } = this.props;
    const cells = children.map((item, index)=>{
      return this.renderCell(
        item.props.header,
        {
          index,
          key: index,
          isHeader: true,
          data,
          ...item.props
        });
    })

    return (
      <thead>
        <tr>{cells}</tr>
      </thead>
    )
  }

  renderBody(children) {
    const { data } = this.props;
    const count = this.props.rowCount;
    const rows = [];

    for (let i = 0; i < count; i++){
      let cells = children.map((item, index)=>{
        return this.renderCell(
          item.props.cell,
          {
            rowIndex: i,
            key: index,
            isHeader: false,
            data,
            ...item.props
          }
        );
      })

      rows.push(<tr key={i}>{cells}</tr>);
    }

    if(rows.length) {
      return <tbody>{rows}</tbody>;
    }
    else {
      return (
        <tbody>
          <tr>
           <td align="center" colSpan={children ? children.length:0}>
            <h3 className="no-data">NO DATA AVAIALBLE</h3>
           </td>
          </tr>
        </tbody>
      );
    }
  }

  renderCell(cell, cellProps){
    let content = null;
    if (React.isValidElement(cell)) {
       content = React.cloneElement(cell, cellProps);
     } else if (typeof cell === 'function') {
       content = cell(cellProps);
     }

     return content;
  }

  renderFooter() {
    let footer = null;

    if(this.props.footer) {
      footer = (
        <tfoot><tr><td colSpan="100%">{this.props.footer}</td></tr></tfoot>
      );
    }

    return footer;
  }

  renderTopBar() {
    let topbar = null;

    if(this.props.topbar) {
      topbar = (
        <thead><tr><td colSpan="100%">{this.props.topbar}</td></tr></thead>
      );
    }

    return topbar;
  }

  render() {
    const children = [];
    React.Children.forEach(this.props.children, child => {
      if (child == null) {
        return;
      }

      if(!child.props._isColumn){
        throw 'Should be Column';
      }

      children.push(child);
    });

    return (
      <StyledTable>
        {this.renderTopBar()}
        {this.renderHeader(children)}
        {this.renderBody(children)}
        {this.renderFooter()}
      </StyledTable>
    );
  }
}

const SortIndicator = ({sortDir})=>{
  if(sortDir === SortTypes.DESC){
    return <Icons.SortDesc />;
  }

  if( sortDir === SortTypes.ASC){
    return <Icons.SortAsc />;
  }

  return <Icons.Sort />;
};

class Column extends React.Component {
  static defaultProps = {
    _isColumn: true
  };

  render() {
    throw new Error("Component Column should never render");
  }
}

const Cell = props => {
  const { isHeader, children } = props;
  let cell = <td>{children}</td>;

  if(isHeader) {
    cell = <th>{children}</th>;
  }

  return cell;
}

const TextCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][columnKey]}
  </Cell>
);

class SortHeaderCell extends React.Component {
  onSortChange = e => {
    e.preventDefault();
    if (!this.props.onSortChange) {
      return;
    }

    const { sortDir, columnKey } = this.props;

    // default
    let newDir = SortTypes.DESC;
    if(sortDir){
      newDir = sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
    }

    this.props.onSortChange(columnKey, newDir);
  }

  render() {
    const { sortDir, title, ...props } = this.props;
    return (
      <Cell {...props}>
        <a onClick={this.onSortChange}>{title}</a>
        <SortIndicator sortDir={sortDir}/>
      </Cell>
    );
  }
}

class EmptyIndicator extends React.Component {

  render() {
    const {children, title} = this.props;
    const noResults = title || "No Results Found";
    return (
      <StyledEmptyIndicator>
        <h2>{noResults}</h2>
        <p>{children}</p>
      </StyledEmptyIndicator>
    );
  }
}


export {
  Column,
  Table,
  Cell,
  TextCell,
  SortHeaderCell,
  SortIndicator,
  SortTypes,
  EmptyIndicator
};
