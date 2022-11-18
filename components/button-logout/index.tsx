import { useRouter } from 'next/router'
import React from 'react'
import { useAuth } from "../../services/AuthProvider"

export default function ButtonLogout() {

  const router = useRouter()
  const { auth, initializing, getRedirect, clearRedirect, user, error } = useAuth()

  function logout(){
    auth.signOut()
    router.push("/")
  }

  function login(){
    router.push("/grant")
  }

  return (
    <>
       
      {user ? (
          <button
          type="button"
          className="text-white bg-red-500 hover:bg-red-600 hover:text-white font-medium rounded-lg text-md py-2 px-4 text-center"
          onClick={logout}
        >
         ออกจากระบบ
        </button>
        ) : 
        <button
          type="button"
          className="text-white bg-red-500 hover:bg-red-600 hover:text-white font-medium rounded-lg text-md py-2 px-4 text-center"
          onClick={login}
        >
         เข้าสู่ระบบ
        </button>
        }

    </>
  )
}

