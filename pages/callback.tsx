import { useRouter } from 'next/router'
import { useAuth } from "../services/AuthProvider"
import React, { useEffect, useRef, useState } from "react"

const Grant = () => {

const { auth, initializing, getRedirect, clearRedirect, user } = useAuth()

const mounted = useRef<boolean>()
const router = useRouter()

const { accessToken } = router.query
  /* Guard if page is navigated away while sign in process is still active */
  useEffect(() => {
    mounted.current = true

    return () => {
    mounted.current = false
    }
  }, [])

  useEffect(() => {
    //console.log(accessToken)
 
    if (!initializing) {
      if (user) {
        const redirect = getRedirect()
        //console.log(redirect)
        if (redirect) {
         router.push(redirect) // go to page which redirected to login
         clearRedirect()
        } else {
         //console.log("Default Page")
        router.push("/datamanager") // go to default protected page
        }
      }
    }
  }, [router, getRedirect, clearRedirect, initializing, user])

  useEffect(() => {
    //console.log(accessToken)
    async function getUserinfo(){
  
      const API_ACCESS = `https://sso.pea.co.th/auth/realms/idm/protocol/openid-connect/userinfo`;
  
      let _headers = new Headers();
             _headers.append("Content-Type", "application/json");
             _headers.append("Authorization", "Bearer "+accessToken);
  
         await fetch(API_ACCESS, {
               method: 'GET',
               headers: _headers,
               //redirect: 'follow'
               })
               .then((response) => {
                 //console.log(response.status)
                 if(response.status == 200){
                  response.json().then( 
                    (data)=> {
                      //console.log(data)
                  
                      auth.manageUser(
                        data.name,
                        data.preferred_username,
                        data.given_name,
                        data.family_name,
                        data.email
                        ) 
                    })
                 }
                if(response.status == 400){
                  console.log("unauthourize")
                }
               })
               .catch(error => console.log('error',error))
    }

    if (accessToken) {
      //console.log("Get user info")
      getUserinfo()
    }
  }, [accessToken])

  return (
    <></>
  )
 
}

export default Grant