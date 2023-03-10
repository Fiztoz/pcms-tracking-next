import '../styles/globals.css'
/////
import { AuthProvider } from "../services/AuthProvider"
import { NextPage } from "next"
import { AppProps } from "next/app"

import React from "react"
import { AuthGuard } from "../services/AuthGuard"
import { CookieConsent } from '../components'

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
}

export default function MyApp(props: AppProps) {

  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props

  return (
    <>
    <CookieConsent/>
      <AuthProvider>
        {/* if requireAuth property is present - protect the page */}
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          // public page
          <Component {...pageProps} />
  
        )}
      </AuthProvider>
    </>

  )
}

