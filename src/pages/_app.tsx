import Layout from '@/components/layout'
import RootProvider from '@/components/providers/RootProvider'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <RootProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RootProvider>
    </SessionProvider>
  )
}
