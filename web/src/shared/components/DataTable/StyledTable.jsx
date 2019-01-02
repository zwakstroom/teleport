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
  background: ${props => props.theme.background.secondary };
  box-shadow: 0 8px 32px rgba(0, 0, 0, .24);
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 4px;
  font-size: 12px;
  margin: 40px 0;
  width: 100%;


  & > thead > tr > th,
  & > tbody > tr > th,
  & > tfoot > tr > th,
  & > thead > tr > td,
  & > tbody > tr > td,
  & > tfoot > tr > td {
    line-height: 24px;
    padding: 16px;
    vertical-align: top;
  }


  & > thead> tr > th,
  & > tbody> tr > th,
  & > tfoot> tr > th,
  & > thead> tr > td,
  & > tbody> tr > td,
  & > tfoot> tr > td {
    line-height: 24px;
    padding: 16px;
    vertical-align: top;
  }


  & > thead > tr > th {
    background: ${props => props.theme.background.quaternary };
    color: rgba(255, 255, 255, .56);
    cursor: pointer;
    font-size: 10px;
    font-weight: 600;
    height: 24px;
    line-height: 24px;
    padding: 0 16px;
    text-align: left;
    text-transform: uppercase;

    .icon {
      font-weight: bold;
      margin-left: 8px;
    }
  }
`;

export const StyledEmptyIndicator = styled.div`
  background: ${props => props.theme.background.quaternary };
  border-radius: 4px;
  box-sizing: border-box;
  margin: 48px auto;
  max-width: 720px;
  padding: 32px;
  text-align: center;

  h2 {
    font-size: 32px;
    font-weight: 300;
    line-height: 40px;
    margin: 0 0 16px 0;
  }

  p {
    font-size: 12px;
    line-height: 24px;
    margin: 0;
  }

  a {
    color: ${props => props.theme.colors.link };
  }
`









