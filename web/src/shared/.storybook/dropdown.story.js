import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Heading from '../Heading'
import { DropdownButton } from './../DropDown/DropdownButton';

const description =
  'A type of the <Text> component' +
  ' using HTML h1-h6 element for setting section headings,' +
  ' supporting all <Text> props'

storiesOf('DropDown Button', module)
  .add('Using <Dropdown> ', () => (
    <DropdownButton />
  ))



