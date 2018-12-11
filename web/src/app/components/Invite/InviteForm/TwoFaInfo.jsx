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
import { Auth2faTypeEnum } from 'app/services/enums';

const U2F_HELP_URL = 'https://support.google.com/accounts/answer/6103523?hl=en';

export default function Invite2faData(props) {
  const { auth2faType, qr } = props;

  if (auth2faType === Auth2faTypeEnum.OTP) {
    return (
      <div className="grv-flex-column grv-invite-barcode">
        <h4>Scan bar code for auth token <br />
          <small>Scan below to generate your two factor token</small>
        </h4>
        <img className="img-thumbnail" src={ `data:image/png;base64,${qr}` } />
      </div>
    )
  }

  if (auth2faType === Auth2faTypeEnum.UTF) {
    return (
      <div className="grv-flex-column">
        <h3>Insert your U2F key </h3>
        <div className="m-t-md">Press the button on the U2F key after you press the sign up button</div>
        <div className="m-t text-muted">
          <small>Click
            <a a target="_blank" href={U2F_HELP_URL}> here </a>
            to learn more about U2F 2-Step Verification.
          </small>
        </div>

    </div>
    )
  }

  return null;
}