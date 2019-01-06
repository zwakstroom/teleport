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
import { NavLink } from 'react-router-dom';
import { Cell } from  'shared/components/DataTable';
import moment from 'moment';
import classnames from 'classnames';
import { Flex } from 'shared/components';

const DateCreatedCell = ({ rowIndex, data, ...props }) => {
  let { createdDisplayText } = data[rowIndex];
  return (
    <Cell {...props}>
      { createdDisplayText }
    </Cell>
  )
};

const DurationCell = ({ rowIndex, data, ...props }) => {
  let { duration } = data[rowIndex];
  let displayDate = moment.duration(duration).humanize();
  return (
    <Cell {...props}>
      { displayDate }
    </Cell>
  )
};

const SingleUserCell = ({ rowIndex, data, ...props }) => {
  let { user } = data[rowIndex];
  return (
    <Cell {...props}>
      <span>{user}</span>
    </Cell>
  )
};

const UsersCell = ({ rowIndex, data, ...props }) => {
  const { parties, user } = data[rowIndex];
  let $users = <div>{user}</div>

  if (parties.length > 0) {
    $users = parties.map((item, itemIndex) => {
      return(
        <div key={itemIndex}>{item}</div>
      )
    })
  }

  return (
    <Cell {...props}>
      <div>
        {$users}
      </div>
    </Cell>
  )
};

const SessionIdCell = ({ rowIndex, canJoin, data, ...props }) => {
  const { sessionUrl, active, sid } = data[rowIndex];
  const isDisabled = active && !canJoin;
  const sidShort = sid.slice(0, 8);
  const actionText = active ? 'join' : 'play';

  const btnClass = classnames('btn btn-xs m-r-sm', {
    'btn-primary': !active,
    'btn-warning': active,
    'disabled': isDisabled
  });

  return (
    <Cell {...props}>
      <Flex flexDirection="row" align="center">
        {isDisabled && <button className={btnClass}>{actionText}</button> }
        {!isDisabled && (
          <NavLink to={sessionUrl} className={btnClass} type="button" >
            {actionText}
          </NavLink>
        )}
        <span style={{ width: "75px" }}>{sidShort}</span>
      </Flex>
    </Cell>
  )
}

const NodeCell = ({ rowIndex, data, ...props }) => {
  let { nodeDisplayText } = data[rowIndex];
  return (
    <Cell {...props}>
      {nodeDisplayText}
    </Cell>
  )
}

export {
  SessionIdCell,
  UsersCell,
  DurationCell,
  DateCreatedCell,
  SingleUserCell,
  NodeCell
};
