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
import styled from 'styled-components';
import PropTypes from 'prop-types'
import {colors} from '../../../../shared/components/theme';


class ExpiredInvite extends React.Component {
  constructor(props) {
    super(props);
  }

  renderGithubLink() {
    const {product} = this.props

    let message = (
      <p>
        If you believe this is an issue with Teleport, please create a
        <GithubLink href="https://github.com/gravitational/teleport/issues/new">GitHub issue</GithubLink>.
      </p>
    );

    if(product === 'gravity') {
      message = (
        <p>
          If you believe this is an issue with Gravity, please create a
          <GithubLink href="https://github.com/gravitational/gravity/issues/new">GitHub issue</GithubLink>.
        </p>
      )
    }

    return message;
  }

  render() {
    return (
      <ExpiredCard>
        <h1>Invite code has expired</h1>
        <p>
        It appears that your invite code isn't valid anymore.
        Please contact your account administrator and request another invite.
        </p>

        {this.renderGithubLink()}
      </ExpiredCard>
    );
  }
}

const GithubLink = styled.a`
  color: ${colors.link};
  margin: 0 0 0 8px;

  &:visted {
    color: ${colors.link};
  }
`;

const ExpiredCard = styled.div`
  background-color: ${colors.bgLight};
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 0 32px rgba(0, 0, 0, .12), 0 8px 32px rgba(0, 0, 0, .24);
  color: ${colors.text};
  margin: 32px auto;
  padding: 40px;
  width: 540px;

  h1 {
    color: ${colors.text};
    font-size: 20px;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
  }

  p {
    line-height: 32px;
  }
`

// https://github.com/gravitational/teleport/issues/new

ExpiredInvite.propTypes = {
  /** The name of the product (gravity, teleport) */
  product: PropTypes.oneOf(['gravity', 'teleport']),
};

ExpiredInvite.defaultProps = {
  product: 'teleport'
};

export default ExpiredInvite;