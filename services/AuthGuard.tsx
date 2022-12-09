import { useAuth } from "../services/AuthProvider"
import { useRouter } from "next/router"
import { useEffect } from "react"
import React from "react"

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { user, initializing, setRedirect,getRedirect } = useAuth()
  const router = useRouter()
  const { pid } = router.query

  useEffect(() => {
    if (!initializing) {
      //auth is initialized and there is no user
      if (!user) {
        // remember the page that user tried to access
       // setRedirect(router.route+"?pid="+pid)
       setRedirect(router.route)
       // router.push("/grant?pid="+pid)
      //router.push("/grant")
      //console.log(process.env.NEXT_PUBLIC_KEY_CLOAK)
      router.push("/callback")
      // window.open('https://sso.pea.co.th/auth/realms/idm/protocol/openid-connect/auth?response_type=code&client_id=pealoan&redirect_uri=http://localhost:3000', '_self');
      }
    }
  }, [initializing, router, user, setRedirect])

  /* show loading indicator while the auth provider is still initializing */
  if (initializing) {
    return (
      <div className="bg-black"></div>
    )
  }

  // if auth initialized with a valid user show protected page
  if (!initializing && user) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}
