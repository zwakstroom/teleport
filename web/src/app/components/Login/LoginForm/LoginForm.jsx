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
import { Card, Heading, Input, Label, Button } from '../../../../shared';
import * as Alerts from '../../../../shared/Alerts';
import { Auth2faTypeEnum } from '../../../services/enums';
import SsoButtonList from './SsoButtons';
import Logo from './Logo';
import { Formik } from 'formik';

export default class LoginForm extends React.Component {

  initialValues = {
    password: '',
    user: '',
    token: ''
  }

  onValidate = values => {
    const errors = {};

    if (!values.user) {
      errors.user = ' is required';
    }

    if (!values.password) {
      errors.password = ' is required';
    }

    if (this.isOTP() && !values.token) {
      errors.token = ' is required';
    }

    return errors;
  }

  onLogin = values => {
    const { user, password, token } = values;
    if (this.props.auth2faType === Auth2faTypeEnum.UTF) {
      this.props.onLoginWithU2f(user, password);
    } else {
      this.props.onLogin(user, password, token);
    }
  }

  onLoginWithSso = ssoProvider => {
    this.props.onLoginWithSso(ssoProvider);
  }

  needs2fa() {
    return !!this.props.auth2faType &&
      this.props.auth2faType !== Auth2faTypeEnum.DISABLED;
  }

  needsSso() {
    return this.props.authProviders && this.props.authProviders.length > 0;
  }

  isOTP() {
    return this.needs2fa() && this.props.auth2faType === Auth2faTypeEnum.OTP;
  }

  renderLoginBtn(onClick) {
    const { isProcessing } = this.props.attempt;
    // const $helpBlock = isProcessing && this.props.auth2faType === Auth2faTypeEnum.UTF ? (
    //     "Insert your U2F key and press the button on the key"
    // ) : null;

    const isDisabled = isProcessing;

    return (
        <Button
          block
          disabled={isDisabled}
          size="large"
          type="submit"
          onClick={onClick}
          mt={4}>
          LOGIN WITH EMAIL
      </Button>
    );
  }

  renderSsoBtns() {
    const { authProviders, attempt } = this.props;
    if (!this.needsSso()) {
      return null;
    }

    return (
      <SsoButtonList
        prefixText="Login with "
        isDisabled={attempt.isProcessing}
        providers={authProviders}
        onClick={this.onLoginWithSso} />
    )
  }

  renderInputFields({ values, errors, touched, handleChange }) {
    const userError = errors.user && touched.user;
    const passError = errors.password && touched.password;
    const tokenError = errors.token && touched.token;

    return (
      <React.Fragment>
        <Label mb={1} hasError={userError}>
          Email
          {userError && errors.user}
        </Label>
        <Input id="user" fontSize={0}
          autoFocus
          value={values.user}
          hasError={userError}
          onChange={handleChange}
          placeholder="User name"
          name="user"
          />
        <Label hasError={passError}>
          Password
          {passError && errors.password}
        </Label>
        <Input
          id="password"
          hasError={passError}
          value={values.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"/>
        {this.isOTP() && (
          <>
            <Label mt={3} mb={1} hasError={tokenError}>
              Two factor token
              {tokenError && errors.token}
            </Label>
            <Input id="token" fontSize={0}
              hasError={tokenError}
              autoComplete="off"
              value={values.token}
              onChange={handleChange}
              placeholder="Two factor token (Google Authenticator)"
              />
            </>
          )
        }
      </React.Fragment>
    )
  }

  render() {
    const { isFailed, message } = this.props.attempt;
    return (
      <div>
        <Logo product="teleport" />

        <Formik
          validate={this.onValidate}
          onSubmit={this.onLogin}
          initialValues={this.initialValues}
        >

          {
            props => (
              <Card bg="secondary" mt="4" mb="4" mr="auto" ml="auto" width="456px" p="5">
                <Heading.h5 textAlign="center" mb="3" color="light">
                  SIGN INTO TELEPORT
                </Heading.h5>
                { isFailed && <Alerts.Danger> {message} </Alerts.Danger>  }
                {this.renderInputFields(props)}
                {this.renderLoginBtn(props.handleSubmit)}
                {this.renderSsoBtns()}
              </Card>
            )
        }
        </Formik>
      </div>
    );
  }
}
