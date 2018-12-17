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

/**
* Sort indicator used by SortHeaderCell
*/
const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC'
};

class Table extends React.Component {

  renderHeader(children){
    const cells = children.map((item, index)=>{
      return this.renderCell(
        item.props.header,
        {
          index,
          key: index,
          isHeader: true,
          ...item.props
        });
    })

    return (
      <thead className="grv-table-header">
        <tr>{cells}</tr>
      </thead>
    )
  }

  renderBody(children){
    const count = this.props.rowCount;
    const rows = [];
    for (var i = 0; i < count; i++){
      var cells = children.map((item, index)=>{
        return this.renderCell(
          item.props.cell,
          {
            rowIndex: i,
            key: index,
            isHeader:  false,
            ...item.props
          }
        );
      })

      rows.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <tbody>{rows}</tbody>
    );
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

    const tableClass = 'table grv-table ' + this.props.className;

    return (
      <StyledTable className={tableClass}>
        {this.renderHeader(children)}
        {this.renderBody(children)}
      </StyledTable>
    );
  }
}

const SortIndicator = ({sortDir})=>{
  let cls = 'grv-table-indicator-sort fa fa-sort'
  if(sortDir === SortTypes.DESC){
    cls += '-desc'
  }

  if( sortDir === SortTypes.ASC){
    cls += '-asc'
  }

  return (<i className={cls}></i>);
};

class Column extends React.Component {
  static defaultProps = {
    _isColumn: true
  }

  render(){
    throw new Error('Component <Column /> should never render');
  }
}

const TableCell = props => {
  let { isHeader, children, className='' } = props;
  className = 'grv-table-cell ' + className;
  return isHeader ?
    <th className={className}>{children}</th> :
    <td>{children}</td>;
}

const TableTextCell = ({rowIndex, data, columnKey, ...props}) => (
  <TableCell {...props}>
    {data[rowIndex][columnKey]}
  </TableCell>
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
      newDir = this.props.sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
    }

    this.props.onSortChange(columnKey, newDir);
  }

  render() {
    const { sortDir, title, ...props } = this.props;
    return (
      <TableCell {...props}>
        <a onClick={this.onSortChange}>
          {title}
        </a>
        <SortIndicator sortDir={sortDir}/>
      </TableCell>
    );
  }
}

export {
  Column,
  Table,
  TableCell as Cell,
  TableTextCell as TextCell,
  SortHeaderCell,
  SortIndicator,
  SortTypes,
  StyledEmptyIndicator as EmptyIndicator
};
