import { type ThemeConfig, extendTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    green: {
      '1000': '#A5DC6E',
      '1200': '#7D8655',
      '1700': '#0D491E',
      '1900': '#243F25',
    },
    orange: {
      '50': '#FEF3E7',
      '100': '#FBDEBB',
      '200': '#F9C990',
      '300': '#F7B464',
      '400': '#F49F38',
      '500': '#F28A0D',
      '600': '#C26F0A',
      '700': '#915308',
      '800': '#613705',
      '900': '#301C03',
    },
    yellow: {
      '50': '#FEFEE6',
      '100': '#FDFCB9',
      '200': '#FCF98D',
      '300': '#FBF760',
      '400': '#FAF533',
      '500': '#F9F306',
      '600': '#C7C205',
      '700': '#959204',
      '800': '#646102',
      '900': '#323101',
    },
  },
})

export default theme
