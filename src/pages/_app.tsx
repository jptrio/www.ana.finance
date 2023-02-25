import Layout from '@/components/layout'
import { AppProps } from 'next/app'
import { AppComponent } from 'next/dist/shared/lib/router/router'

export default function App({
  Component,
  pageProps,
}: {
  Component: AppComponent
  pageProps: AppProps
}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
