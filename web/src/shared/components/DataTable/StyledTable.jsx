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

import styled from 'styled-components'

export const StyledTable = styled.table`
  background-color: rgba(0,0,0,0);
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  margin-bottom: 20px;
  max-width: 100%;
  width: 100%;

  & > thead > tr > th,
  & > tbody > tr > th,
  & > tfoot > tr > th,
  & > thead > tr > td,
  & > tbody > tr > td,
  & > tfoot > tr > td {
    line-height: 1.42857;
    padding: 8px;
    vertical-align: top;
  }

  & > thead > tr > th {
    border-bottom: 1px solid #DDDDDD;
  }

  & > thead> tr > th,
  & > tbody> tr > th,
  & > tfoot> tr > th,
  & > thead> tr > td,
  & > tbody> tr > td,
  & > tfoot> tr > td {
    border-top: 1px solid #e7eaec;
    line-height: 1.42857;
    padding: 8px;
    vertical-align: top;
  }
`

export const StyledEmptyIndicator = styled.div`
  font-size: 17px;
`