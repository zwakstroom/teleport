import styled from 'styled-components'
import { space, fontSize, width, color } from 'styled-system'
import './../../assets/icomoon/style.css';

const fontIconClasses = {
  "AddUsers": 'icon-users-plus',
  "Amex": 'icon-cc-amex',
  "Apartment": 'icon-apartment',
  "Apple": 'icon-apple',
  "Archive": 'icon-archive2',
  "ArrowDown": 'icon-chevron-down',
  "ArrowLeft": 'icon-chevron-left',
  "ArrowRight": 'icon-chevron-right',
  "ArrowsVertical": 'icon-chevrons-expand-vertical',
  "ArrowUp": 'icon-chevron-up',
  "Bitbucket": 'icon-bitbucket',
  "Bubble": 'icon-bubble',
  "Calendar": 'icon-calendar-empty',
  "Camera": 'icon-camera',
  "CardView": 'icon-th-large',
  "CardViewSmall": 'icon-th',
  "CaretLeft": 'icon-caret-left',
  "CaretRight": 'icon-caret-right',
  "CarrotDown": 'icon-caret-down',
  "CarrotLeft": 'icon-caret-left',
  "CarrotRight": 'icon-caret-right',
  "CarrotSort": 'icon-sort',
  "CarrotUp": 'icon-caret-up',
  "Cash": 'icon-cash-dollar',
  "CircleCheck": 'icon-checkmark-circle',
  "CircleCross": 'icon-cross-circle',
  "CirclePause": 'icon-pause-circle',
  "CirclePlay": 'icon-play-circle',
  "CircleStop": 'icon-stop-circle',
  "Cli": 'icon-cli',
  "Clipboard": 'icon-clipboard-text',
  "ClipboardUser": 'icon-clipboard-user',
  "Cloud": 'icon-cloud',
  "Cluster": 'icon-site-map',
  "Code": 'icon-code',
  "Cog": 'icon-cog',
  "Contract": 'icon-frame-contract',
  "CreditCard": 'icon-credit-card1',
  "CreditCardAlt": 'icon-credit-card-alt',
  "CreditCardAlt2": 'icon-credit-card',
  "Cross": 'icon-cross',
  "Database": 'icon-database',
  "Discover": 'icon-cc-discover',
  "Earth": 'icon-earth',
  "Edit": 'icon-pencil4',
  "Ellipsis": 'icon-ellipsis',
  "Expand": 'icon-frame-expand',
  "Facebook": 'icon-facebook',
  "FacebookSquare": 'icon-facebook2',
  "Github": 'icon-github',
  "Google": 'icon-google-plus',
  "Graph": 'icon-graph',
  "Home": 'icon-home3',
  "Label": 'icon-label',
  "Lan": 'icon-lan',
  "LanAlt": 'icon-lan2',
  "Layers": 'icon-layers',
  "License": 'icon-license2',
  "Link": 'icon-link',
  "Linkedin": 'icon-linkedin',
  "Linux": 'icon-linux',
  "ListBullet": 'icon-list4',
  "ListCheck": 'icon-list3',
  "ListView": 'icon-th-list',
  "Lock": 'icon-lock',
  "Magnifier": 'icon-magnifier',
  "MapMarker": 'icon-map-marker',
  "MasterCard": 'icon-cc-mastercard',
  "Mute": 'icon-mute',
  "OpenID": 'icon-openid',
  "Paypal": 'icon-cc-paypal',
  "Pencil": 'icon-pencil',
  "Phone": 'icon-telephone',
  "Planet": 'icon-planet',
  "Play": 'icon-play',
  "Power": 'icon-power',
  "Profile": 'icon-profile',
  "Server": 'icon-server',
  "Shart": 'icon-chart-bars',
  "ShieldCheck": 'icon-shield-check',
  "Signal": 'icon-signal',
  "SmartPhone": 'icon-smartphone-embed',
  "Sort": 'icon-chevrons-expand-vertical',
  "SortAsc": 'icon-chevron-up',
  "SortDesc": 'icon-chevron-down',
  "Speed": 'icon-speed-fast',
  "Spinner": 'icon-spinner8',
  "Stripe": 'icon-cc-stripe',
  "Tablet": 'icon-tablet2',
  "Trash": 'icon-trash2',
  "Twitter": 'icon-twitter',
  "Unlock": 'icon-unlock',
  "User": 'icon-user',
  "Users": 'icon-users2',
  "Visa": 'icon-cc-visa',
  "VolumeUp": 'icon-volume-high',
  "Wifi": 'icon-wifi',
  "Window": 'icon-window',
  "Windows": 'icon-windows',
  "Youtube": 'icon-youtube',
}

function makeFontIcon(kind) {
  const className = `icon ${fontIconClasses[kind]}`;
  const Icon = styled.span.attrs({className: className})`
    ${space} ${width} ${color} ${fontSize}
  `

  Icon.displayName = `Icon.${kind}`;

  return Icon;
}

export const AddUsers = makeFontIcon('AddUsers');
export const Amex = makeFontIcon('Amex');
export const Apartment = makeFontIcon('Apartment');
export const Apple = makeFontIcon('Apple');
export const Archive = makeFontIcon('Archive');
export const ArrowDown = makeFontIcon('ArrowDown');
export const ArrowLeft = makeFontIcon('ArrowLeft');
export const ArrowRight = makeFontIcon('ArrowRight');
export const ArrowsVertical = makeFontIcon('ArrowsVertical');
export const ArrowUp = makeFontIcon('ArrowUp');
export const BitBucket = makeFontIcon('Bitbucket')
export const Bubble = makeFontIcon('Bubble');
export const Calendar = makeFontIcon('Calendar');
export const Camera = makeFontIcon('Camera');
export const CardView = makeFontIcon('CardView');
export const CardViewSmall = makeFontIcon('CardViewSmall');
export const CaretLeft = makeFontIcon('CaretLeft');
export const CaretRight = makeFontIcon('CaretRight');
export const CarrotDown = makeFontIcon('CarrotDown');
export const CarrotLeft = makeFontIcon('CarrotLeft');
export const CarrotRight = makeFontIcon('CarrotRight');
export const CarrotSort = makeFontIcon('CarrotSort');
export const CarrotUp = makeFontIcon('CarrotUp');
export const Cash = makeFontIcon('Cash');
export const CircleCheck = makeFontIcon('CircleCheck');
export const CircleCross = makeFontIcon('CircleCross');
export const CirclePause = makeFontIcon('CirclePause');
export const CirclePlay = makeFontIcon('CirclePlay');
export const CircleStop = makeFontIcon('CircleStop');
export const Cli = makeFontIcon('Cli');
export const Clipboard = makeFontIcon('Clipboard');
export const ClipboardUser = makeFontIcon('ClipboardUser');
export const Cloud = makeFontIcon('Cloud');
export const Cluster = makeFontIcon('Cluster');
export const Code = makeFontIcon('Code');
export const Cog = makeFontIcon('Cog');
export const Contract = makeFontIcon('Contract');
export const CreditCard = makeFontIcon('CreditCard');
export const CreditCardAlt = makeFontIcon('CreditCardAlt');
export const CreditCardAlt2 = makeFontIcon('CreditCardAlt2');
export const Cross = makeFontIcon('Cross');
export const Database = makeFontIcon('Database');
export const Discover = makeFontIcon('Discover');
export const Earth = makeFontIcon('Earth');
export const Edit = makeFontIcon('Edit');
export const Ellipsis = makeFontIcon('Ellipsis');
export const Expand = makeFontIcon('Expand');
export const Facebook = makeFontIcon('Facebook');
export const FacebookSquare = makeFontIcon('FacebookSquare');
export const Github = makeFontIcon('Github');
export const Google = makeFontIcon('Google');
export const Graph = makeFontIcon('Graph');
export const Home = makeFontIcon('Home');
export const Label = makeFontIcon('Label');
export const Lan = makeFontIcon('Lan');
export const LanAlt = makeFontIcon('LanAlt');
export const Layers = makeFontIcon('Layers');
export const License = makeFontIcon('License');
export const Link = makeFontIcon('Link');
export const Linkedin = makeFontIcon('Linkedin');
export const Linux = makeFontIcon('Linux');
export const ListBullet = makeFontIcon('ListBullet');
export const ListCheck = makeFontIcon('ListCheck');
export const ListView = makeFontIcon('ListView');
export const Lock = makeFontIcon('Lock');
export const Magnifier = makeFontIcon('Magnifier');
export const MapMarker = makeFontIcon('MapMarker');
export const MasterCard = makeFontIcon('MasterCard');
export const Mute = makeFontIcon('Mute');
export const OpenID = makeFontIcon('OpenID');
export const Paypal = makeFontIcon('Paypal');
export const Pencil = makeFontIcon('Pencil');
export const Phone = makeFontIcon('Phone');
export const Planet = makeFontIcon('Planet');
export const Play = makeFontIcon('Play');
export const Power = makeFontIcon('Power');
export const Profile = makeFontIcon('Profile');
export const Server = makeFontIcon('Server');
export const Shart = makeFontIcon('Shart');
export const ShieldCheck = makeFontIcon('ShieldCheck');
export const Signal = makeFontIcon('Signal');
export const SmartPhone = makeFontIcon('SmartPhone');
export const Sort = makeFontIcon('Sort');
export const SortAsc = makeFontIcon('SortAsc');
export const SortDesc = makeFontIcon('SortDesc');
export const Speed = makeFontIcon('Speed');
export const Spinner = makeFontIcon('Spinner');
export const Stripe = makeFontIcon('Stripe');
export const Tablet = makeFontIcon('Tablet');
export const Trash = makeFontIcon('Trash');
export const Twitter = makeFontIcon('Twitter');
export const Unlock = makeFontIcon('Unlock');
export const User = makeFontIcon('User');
export const Users = makeFontIcon('Users');
export const Visa = makeFontIcon('Visa');
export const VolumeUp = makeFontIcon('VolumeUp');
export const Wifi = makeFontIcon('Wifi');
export const Window = makeFontIcon('Window');
export const Windows = makeFontIcon('Windows');
export const Youtube = makeFontIcon('Youtube');
