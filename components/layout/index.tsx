import React from 'react'
import Head from 'next/head'
import Footer from '../footer'

// import { Navbar, Footer } from "../index"

export default function BaseLayout({children}) {
    return (
      <>
      <Head>
        <title>PCMS TRacking</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <link rel="shortcut icon" href="/kap.svg" /> */}
      </Head>
   

      <div className="flex flex-col h-screen-min justify-between">
          {/* <header className="h-10 bg-red-500">Header</header> */}
          <main className="mb-10 bg-white"> 
            {children} 
          </main>

          <footer> 
              <Footer /> 
          </footer>
      </div>
      </>


    )
  }