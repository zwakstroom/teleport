import React from 'react';
import styled from 'styled-components'
import { space, fontSize, width, color } from 'styled-system'
import './../../assets/icomoon/style.css';

const fontIconClasses = {
  "CarrotDown": 'icon-caret-down',
  "CarrotUp": 'icon-caret-up',
  "CarrotLeft": 'icon-caret-left',
  "CarrotRight": 'icon-caret-right',
  "CarrotSort": 'icon-sort',
  "Earth": 'icon-earth',
  "CircleCheck": 'icon-checkmark-circle',
  "CircleCross": 'icon-cross-circle',
  "CircleStop": 'icon-stop-circle',
  "CirclePlay": 'icon-play-circle',
  "CirclePause": 'icon-pause-circle',
  "Magnifier": 'icon-magnifier',
  "Cluster": 'icon-site-map',
  "Ellipsis": 'icon-ellipsis',
  "Github": 'icon-github',
  "Google": 'icon-google-plus2',
  "SortDesc": 'icon-chevron-down',
  "SortAsc": 'icon-chevron-up',
  "Sort": 'icon-chevrons-expand-vertical',
  "CardView": 'icon-th-large',
  "CardViewSmall": 'icon-th',
  "ListView": 'icon-th-list',
  "Twitter": 'icon-twitter',
  "Facebook": 'icon-facebook',
  "CreditCard": 'icon-credit-card1',
  "CaretLeft": 'icon-caret-left',
  "CaretRight": 'icon-caret-right',
  "Apple": 'icon-apple',
  "Windows": 'icon-windows',
  "Linux": 'icon-linux',
  "Visa": 'icon-cc-visa',
  "MasterCard": 'icon-cc-mastercard',
  "Discover": 'icon-cc-discover',
  "Amex": 'icon-cc-amex',
  "Paypal": 'icon-cc-paypal',
  "Stripe": 'icon-cc-stripe',
  "CreditCardAlt": 'icon-credit-card-alt',
  "Home": 'icon-home3',
  "Apartment": 'icon-apartment',
  "Pencil": 'icon-pencil',
  "Edit": 'icon-pencil4',
  "Cloud": 'icon-cloud',
  "Database": 'icon-database',
  "Server": 'icon-server',
  "ShieldCheck": 'icon-shield-check',
  "Lock": 'icon-lock',
  "Unlock": 'icon-unlock',
  "Cog": 'icon-cog',
  "Trash": 'icon-trash2',
  "Archive": 'icon-archive2',
  "Clipboard": 'icon-clipboard-text',
  "ClipboardUser": 'icon-clipboard-user',
  "License": 'icon-license2',
  "Play": 'icon-play',
  "Camera": 'icon-camera',
  "Label": 'icon-label',
  "Profile": 'icon-profile',
  "User": 'icon-user',
  "Users": 'icon-users2',
  "AddUsers": 'icon-users-plus',
  "CreditCardAlt2": 'icon-credit-card',
  "Cash": 'icon-cash-dollar',
  "Phone": 'icon-telephone',
  "MapMarker": 'icon-map-marker',
  "Calendar": 'icon-calendar-empty',
  "Signal": 'icon-signal',
  "SmartPhone": 'icon-smartphone-embed',
  "Tablet": 'icon-tablet2',
  "Window": 'icon-window',
  "Power": 'icon-power',
  "Bubble": 'icon-bubble',
  "Graph": 'icon-graph',
  "Shart": 'icon-chart-bars',
  "Speed": 'icon-speed-fast',
  "Planet": 'icon-planet',
  "VolumeUp": 'icon-volume-high',
  "Mute": 'icon-mute',
  "Lan": 'icon-lan',
  "LanAlt": 'icon-lan2',
  "Wifi": 'icon-wifi',
  "Cli": 'icon-cli',
  "Code": 'icon-code',
  "Link": 'icon-link',
  "Cross": 'icon-cross',
  "ListCheck": 'icon-list3',
  "ListBullet": 'icon-list4',
  "ArrowUp": 'icon-chevron-up',
  "ArrowDown": 'icon-chevron-down',
  "ArrowLeft": 'icon-chevron-left',
  "ArrowRight": 'icon-chevron-right',
  "ArrowsVertical": 'icon-chevrons-expand-vertical',
  "Expand": 'icon-frame-expand',
  "Contract": 'icon-frame-contract',
  "Layers": 'icon-layers',
  "Spinner": 'icon-spinner8',
  "FacebookSquare": 'icon-facebook2',
  "Youtube": 'icon-youtube',
  "Linkedin": 'icon-linkedin',
}

function makeFontIcon(kind) {
  const className = `icon ${fontIconClasses[kind]}`;
  const Icon = styled.span.attrs({className: className})`
    ${space} ${width} ${color} ${fontSize}
  `

  Icon.displayName = `Icon.${kind}`;

  return Icon;
}

export const CarrotDown = makeFontIcon('CarrotDown');
export const CarrotUp = makeFontIcon('CarrotUp');
export const CarrotLeft = makeFontIcon('CarrotLeft');
export const CarrotRight = makeFontIcon('CarrotRight');
export const CarrotSort = makeFontIcon('CarrotSort');
export const Earth = makeFontIcon('Earth');
export const CircleCheck = makeFontIcon('CircleCheck');
export const CircleCross = makeFontIcon('CircleCross');
export const CircleStop = makeFontIcon('CircleStop');
export const CirclePlay = makeFontIcon('CirclePlay');
export const CirclePause = makeFontIcon('CirclePause');
export const Magnifier = makeFontIcon('Magnifier');
export const Cluster = makeFontIcon('Cluster');
export const Ellipsis = makeFontIcon('Ellipsis');
export const Github = makeFontIcon('Github');
export const Google = makeFontIcon('Google');
export const SortDesc = makeFontIcon('SortDesc');
export const SortAsc = makeFontIcon('SortAsc');
export const Sort = makeFontIcon('Sort');
export const CardView = makeFontIcon('CardView');
export const CardViewSmall = makeFontIcon('CardViewSmall');
export const ListView = makeFontIcon('ListView');
export const Twitter = makeFontIcon('Twitter');
export const Facebook = makeFontIcon('Facebook');
export const CreditCard = makeFontIcon('CreditCard');
export const CaretLeft = makeFontIcon('CaretLeft');
export const CaretRight = makeFontIcon('CaretRight');
export const Apple = makeFontIcon('Apple');
export const Windows = makeFontIcon('Windows');
export const Linux = makeFontIcon('Linux');
export const Visa = makeFontIcon('Visa');
export const MasterCard = makeFontIcon('MasterCard');
export const Discover = makeFontIcon('Discover');
export const Amex = makeFontIcon('Amex');
export const Paypal = makeFontIcon('Paypal');
export const Stripe = makeFontIcon('Stripe');
export const CreditCardAlt = makeFontIcon('CreditCardAlt');
export const Home = makeFontIcon('Home');
export const Apartment = makeFontIcon('Apartment');
export const Pencil = makeFontIcon('Pencil');
export const Edit = makeFontIcon('Edit');
export const Cloud = makeFontIcon('Cloud');
export const Database = makeFontIcon('Database');
export const Server = makeFontIcon('Server');
export const ShieldCheck = makeFontIcon('ShieldCheck');
export const Lock = makeFontIcon('Lock');
export const Unlock = makeFontIcon('Unlock');
export const Cog = makeFontIcon('Cog');
export const Trash = makeFontIcon('Trash');
export const Archive = makeFontIcon('Archive');
export const Clipboard = makeFontIcon('Clipboard');
export const ClipboardUser = makeFontIcon('ClipboardUser');
export const License = makeFontIcon('License');
export const Play = makeFontIcon('Play');
export const Camera = makeFontIcon('Camera');
export const Label = makeFontIcon('Label');
export const Profile = makeFontIcon('Profile');
export const User = makeFontIcon('User');
export const Users = makeFontIcon('Users');
export const AddUsers = makeFontIcon('AddUsers');
export const CreditCardAlt2 = makeFontIcon('CreditCardAlt2');
export const Cash = makeFontIcon('Cash');
export const Phone = makeFontIcon('Phone');
export const MapMarker = makeFontIcon('MapMarker');
export const Calendar = makeFontIcon('Calendar');
export const Signal = makeFontIcon('Signal');
export const SmartPhone = makeFontIcon('SmartPhone');
export const Tablet = makeFontIcon('Tablet');
export const Window = makeFontIcon('Window');
export const Power = makeFontIcon('Power');
export const Bubble = makeFontIcon('Bubble');
export const Graph = makeFontIcon('Graph');
export const Shart = makeFontIcon('Shart');
export const Speed = makeFontIcon('Speed');
export const Planet = makeFontIcon('Planet');
export const VolumeUp = makeFontIcon('VolumeUp');
export const Mute = makeFontIcon('Mute');
export const Lan = makeFontIcon('Lan');
export const LanAlt = makeFontIcon('LanAlt');
export const Wifi = makeFontIcon('Wifi');
export const Cli = makeFontIcon('Cli');
export const Code = makeFontIcon('Code');
export const Link = makeFontIcon('Link');
export const Cross = makeFontIcon('Cross');
export const ListCheck = makeFontIcon('ListCheck');
export const ListBullet = makeFontIcon('ListBullet');
export const ArrowUp = makeFontIcon('ArrowUp');
export const ArrowDown = makeFontIcon('ArrowDown');
export const ArrowLeft = makeFontIcon('ArrowLeft');
export const ArrowRight = makeFontIcon('ArrowRight');
export const ArrowsVertical = makeFontIcon('ArrowsVertical');
export const Expand = makeFontIcon('Expand');
export const Contract = makeFontIcon('Contract');
export const Layers = makeFontIcon('Layers');
export const Spinner = makeFontIcon('Spinner');
export const FacebookSquare = makeFontIcon('FacebookSquare');
export const Youtube = makeFontIcon('Youtube');
export const Linkedin = makeFontIcon('Linkedin');
