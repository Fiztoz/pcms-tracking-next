import { useRouter } from 'next/router'
import React from 'react'
import { useAuth } from "../../services/AuthProvider"

import { FaSignOutAlt,FaLock } from "react-icons/fa";


export default function ButtonLogout() {

  const router = useRouter()
  const { auth, initializing, getRedirect, clearRedirect, user, error } = useAuth()

  function logout(){
    auth.signOut()
    //router.push("/")
  }

  function login(){
    //router.push("/callback")
  }

  return (
    <>
       
      {user ? (
        <button 
        className="inline-flex items-center font-light  bg-rose-500 hover:bg-rose-400 px-3 py-1 rounded-lg text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" 
        type="button" onClick={logout}
       >
       <p className='px-2'>ออกจากระบบ</p>
       <FaSignOutAlt />
       </button>
        ) : 
        <button
          type="button"
          className="inline-flex items-center  text-white bg-red-500 hover:bg-red-600 hover:text-white font-medium rounded-lg text-md py-2 px-4 text-center"
          onClick={login}
        >
         
        <p className='px-2'>เข้าสู่ระบบ</p>
       <FaLock />
        </button>
        }

    </>
  )
}

