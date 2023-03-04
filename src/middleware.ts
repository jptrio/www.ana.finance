import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: '/',
}

export function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo?.country

  const blockedCountries = [
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

  return NextResponse.next()
}
