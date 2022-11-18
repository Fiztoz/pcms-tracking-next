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
      router.push("/grant")
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
