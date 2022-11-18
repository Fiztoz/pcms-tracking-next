import Head from 'next/head'
// import { Navbar, Footer } from "../index"

export default function BaseLayout({children}) {
    return (
      <>
      <Head>
        <title>PCMS TRacking</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <link rel="shortcut icon" href="/kap.svg" /> */}
      </Head>
      <div className="bg-white overflow-hidden min-h-screen">
       {/* <Navbar  /> */}
       <div className="mx-auto px-4">
       {/* <Header/> */}
       
       {children}
       </div>
      {/* <Footer /> */}
      </div>
      </>
    )
  }