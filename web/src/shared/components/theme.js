import { platform } from './utils/platform';

const fontMonoLinux = `"Droid Sans Mono", "monospace", monospace, "Droid Sans Fallback`;
const fontMonoWin = `Consolas, "Courier New", monospace`;
const fontMonoMac = `Menlo, Monaco, "Courier New", monospace`;

export const font = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";`

export const fonts = {
  sansSerif: font,
  mono: getMonoFont()
}

export const regular = 400
export const bold = 600
export const fontSizes = [12, 14, 16, 20, 24, 32, 48];
export const fontWeights = { regular, bold }
export const space = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80];

export const background = {
  light: '#FFFFFF',
  primary: '#111B48',
  secondary: '#222C59',
  tertiary: '#263266',
  quaternary: '#1B234A',
  error: '#FEE5ED',
  success: '#00BFA5'
}

export const colors = {
  accent: '#FA2A6A',
  dark: '#000',
  light: '#fff',
  error: '#FA2A6A',
  warning: '#FA2A6A',
  subtle: '#EDF0F2',
  success: '#00BFA5',
  highlight: '#E1F5FE',
  link: '#039BE5',

  primary: '#00BFA5',
  primaryLight: '#00EAC3',
  primaryDark: '#008A7E',

  secondary: '#0C143D',
  secondaryLight: '#222C59',
  text: '#263238',

  lightBlue: '#cdf',
  blue: '#007aff',
  darkBlue: '#049',
  lightGreen: '#cec',
  green: '#0a0',
  darkGreen: '#060',
}

export const borders = [
  0,
  '1px solid',
  '2px solid',
  '4px solid',
  '8px solid',
  '16px solid',
  '32px solid',
];

const theme = {
  colors,
  background,
  fontSizes,
  font,
  fontWeights,
  space,
  borders,
  regular,
  bold
}

export default theme;

function getMonoFont() {
  if (platform.isLinux) {
    return fontMonoLinux;
  }

  if (platform.isMac) {
    return fontMonoMac;
  }

  if (platform.isWin) {
    return fontMonoWin;
  }

  return fontMonoLinux;
}