
export const font = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";`

export const fonts = {
  sansSerif: font,
  monoLinux: `Droid Sans Mono", "monospace", monospace, "Droid Sans Fallback`,
  monoWin: `Consolas, "Courier New", monospace`,
  monoMac: `Menlo, Monaco, "Courier New", monospace`,
  mono: `Droid Sans Mono", "Andale Mono", Consolas, monospace`
}

export const regular = 400

export const bold = 600

export const fontSizes = [12, 14, 16, 20, 24, 32, 48];

export const fontWeights = { regular, bold }

export const space = [0, 4, 8, 16, 32, 64, 128]

export const colors = {
  black: '#000',
  light: '#fff',
  text: '#001833',
  lightBlue: '#cdf',
  blue: '#007aff',
  darkBlue: '#049',
  lightGray: '#f6f8fa',
  borderGray: '#d1d6db',
  gray: '#687B8E',
  darkGray: '#364049',
  lightGreen: '#cec',
  green: '#0a0',
  darkGreen: '#060',
  lightRed: '#fcc',
  red: '#c00',
  darkRed: '#800',
  lightOrange: '#feb',
  orange: '#fa0',
  darkOrange: '#a50',
  lightPurple: '#ecf',
  purple: '#70b',
  darkPurple: '#407',
}

export const background = {
  primary: '#0C143D',
  secondary: '#222C59',
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