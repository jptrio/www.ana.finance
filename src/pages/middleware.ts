import countries from '@../../lib/countries.json'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/',
}

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo?.country
  const city = geo?.city
  const region = geo?.region

  const countryInfo = countries.find(x => x.cca2 === country)

  const blockedCountries = [
    'US',
    'CM',
    'CF',
    'GA',
    'GY',
    'LS',
    'LY',
    'ZW',
    'QA',
    'SA',
    'CN',
    'KP',
    'MM',
    'UA',
    'IR',
    'SY',
    'VE',
    'BY',
    'RU',
    'ML',
    'CU',
    'CD',
    'LB',
    'YE',
    'ET',
    'LY',
    'ZW',
    'HK',
    'SD',
    'CF',
    'IQ',
  ]

  if (country && blockedCountries.includes(country)) {
    return new NextResponse(null, { status: 403 })
  }

  return NextResponse.rewrite(url)
}
