// import Layout from '../components/layout'

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";

 
export default function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
      
    </SessionProvider>
    // <Layout>
      
    // </Layout>
  )
}