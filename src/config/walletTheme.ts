import {
  RainbowKitProvider,
  Theme,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { merge } from 'lodash'

const customRainbowTheme: Theme = merge(lightTheme({ overlayBlur: 'small' }), {
  colors: {
    accentColor: '#F49F38',
  },
})

export default customRainbowTheme
