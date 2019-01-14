import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import styled from 'styled-components'
import * as Icon from '../Icon';

storiesOf('Icon', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false,
    },
  })
  .add('Icon components', () => (
    <Container>
      <Icon.CarrotDown />
      <Icon.CarrotUp />
      <Icon.CarrotLeft />
      <Icon.CarrotRight />
      <Icon.CarrotSort />
      <Icon.Earth />
      <Icon.CircleCheck />
      <Icon.CircleCross />
      <Icon.CircleStop />
      <Icon.CirclePlay />
      <Icon.CirclePause />
      <Icon.CircleArrowLeft />
      <Icon.CircleArrowRight />
      <Icon.ChevronCircleUp />
      <Icon.ChevronCircleDown />
      <Icon.ChevronCircleLeft />
      <Icon.ChevronCircleRight />
      <Icon.Magnifier />
      <Icon.Cluster />
      <Icon.Ellipsis />
      <Icon.Github />
      <Icon.Google />
      <Icon.SortDesc />
      <Icon.SortAsc />
      <Icon.Sort />
      <Icon.CardView />
      <Icon.CardViewSmall />
      <Icon.ListView />
      <Icon.Twitter />
      <Icon.Facebook />
      <Icon.CreditCard />
      <Icon.CaretLeft />
      <Icon.CaretRight />
      <Icon.Apple />
      <Icon.Windows />
      <Icon.Linux />
      <Icon.Visa />
      <Icon.MasterCard />
      <Icon.Discover />
      <Icon.Amex />
      <Icon.Paypal />
      <Icon.Stripe />
      <Icon.CreditCardAlt />
      <Icon.Home />
      <Icon.Apartment />
      <Icon.Pencil />
      <Icon.Edit />
      <Icon.Cloud />
      <Icon.Database />
      <Icon.Server />
      <Icon.ShieldCheck />
      <Icon.Lock />
      <Icon.Unlock />
      <Icon.Cog />
      <Icon.Trash />
      <Icon.Archive />
      <Icon.Clipboard />
      <Icon.ClipboardUser />
      <Icon.License />
      <Icon.Play />
      <Icon.Camera />
      <Icon.Label />
      <Icon.Profile />
      <Icon.User />
      <Icon.Users />
      <Icon.AddUsers />
      <Icon.CreditCardAlt2 />
      <Icon.Cash />
      <Icon.Phone />
      <Icon.MapMarker />
      <Icon.Calendar />
      <Icon.Signal />
      <Icon.SmartPhone />
      <Icon.Tablet />
      <Icon.Window />
      <Icon.Power />
      <Icon.Bubble />
      <Icon.Graph />
      <Icon.Shart />
      <Icon.Speed />
      <Icon.Planet />
      <Icon.VolumeUp />
      <Icon.Mute />
      <Icon.Lan />
      <Icon.LanAlt />
      <Icon.Wifi />
      <Icon.Cli />
      <Icon.Code />
      <Icon.Link />
      <Icon.Cross />
      <Icon.ListCheck />
      <Icon.ListBullet />
      <Icon.ArrowUp />
      <Icon.ArrowDown />
      <Icon.ArrowLeft />
      <Icon.ArrowRight />
      <Icon.ArrowsVertical />
      <Icon.Expand />
      <Icon.Contract />
      <Icon.Layers />
      <Icon.Spinner />
      <Icon.FacebookSquare />
      <Icon.Youtube />
      <Icon.Linkedin />
    </Container>
  ));

const Container = styled.div`
  font-size: 24px;

  .icon {
    display: inline-block;
    margin: 20px 20px 10px 10px;
  }
`