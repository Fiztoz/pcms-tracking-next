import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { useAuth } from "../services/AuthProvider"

import React, { Fragment,useEffect, useRef, useState } from "react"
import { BaseLayout, Navbar } from '../components'
import { LockClosedIcon } from '@heroicons/react/24/solid'


import Image from 'next/image'

// import { LockClosedIcon } from '@heroicons/react/solid'

const Grant = () => {

const { auth, initializing, getRedirect, clearRedirect, user } = useAuth()
const mounted = useRef<boolean>()

const [modalbox, setModalbox] = useState({
  title: "Sorry",
  message:"",
  state:null
})

 const router = useRouter()
// const { pid } = router.query

let [isOpen, setIsOpen] = useState(false)

function closeModal() {
  setIsOpen(false)
}

function openModal() {
  setIsOpen(true)
}

  /* Guard if page is navigated away while sign in process is still active */
  useEffect(() => {
    mounted.current = true

    return () => {
    mounted.current = false
    }
  }, [])

  useEffect(() => {
 
    if (!initializing) {
      if (user) {
        const redirect = getRedirect()
        //console.log(redirect)
        if (redirect) {
         router.push(redirect) // go to page which redirected to login
          //clearRedirect()
        } else {
           console.log("ERROR")
          //router.push("/device?="+pid) // go to default protected page
        }
      }
    }
  }, [router, getRedirect, clearRedirect, initializing, user])


  async function verify(event){
  
    const API_HOST = process.env.NEXT_PUBLIC_API_BACKEND;
    const API_ACCESS = `${API_HOST}/api/auth/local`;
    let _host = API_ACCESS 

    event.preventDefault() // don't redirect page
    let identifier = event.target.employeeid.value
    let password = event.target.password.value
    console.log(_host)
    console.log(identifier+password)

    try {
      if(identifier !=null){
        let _headers = new Headers();
           _headers.append("Content-Type", "application/json");
 
        let _body = JSON.stringify({
               // "address": "0x8bfe6935830fa664a89c7696f211f5a314f5b14b"
             //   "identifier":  _address.toLowerCase(),
             //   "password" : pid
             "identifier":  identifier,
             "password" : password
            });
       console.log(_body)
       await fetch(_host, {
             method: 'POST',
             headers: _headers,
             body: _body,
             //redirect: 'follow'
             })
             .then((response) => {
               console.log(response.status)
               if(response.status == 200){
                response.json().then( 
                  (data)=> {
                    //console.log(data)
                    // console.log(data.jwt)
                    // console.log(data.user.username)
                    auth.manageUser(data.user.username,data.jwt) 
                  })
               }
              if(response.status == 400){
                //console.log("unauthourize")
              openModal()
              setModalbox(prev => ({...prev,
                message:"ชื่อผู้ใช้ไม่ถูกต้องหรือไม่ได้รับสิทธิเข้าใช้งาน"
                  }))
   
              }
             })
             .catch(error => console.log('error',error))
      }
      
     } catch {
        console.log(`Request Error`)
    }
  }

  function disagree(){
    //console.log("go home")
    router.push("/")
  }

  async function testfunction (event){
    event.preventDefault() // don't redirect page
    let identifier = event.target.employeeid.value
    let password = event.target.password.value
    console.log(identifier+password)
  }

  return (
    <>

    <Navbar main={false} dashboard={false} datamanager={false} />
    <BaseLayout>
      
    {/* <div className="flex h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
         
            <h2 className="mt-6 text-center text-3xl font-normal tracking-tight text-gray-600">
              PCMS Tracking
            </h2>
          </div>
          <form className="mt-8 space-y-10" onSubmit={ verify }>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
            
                <label className="sr-only">
                  รหัสพนักงาน
                </label>
                <input
                  id="employeeid"
                  name="employeeid"
                  type="number"
                  autoComplete="current-username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="รหัสพนักงาน"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  รหัสผ่าน
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="รหัสผ่าน"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 text-violet-600 focus:ring-violet-500"
                />
                <label className="ml-2 block text-sm text-gray-600">
                  จำรหัสผ่าน
                </label>
              </div>
            </div>

            <div className='mt-500'>
              <button
                type="submit" 
                className="group relative flex w-full  justify-center rounded-md border border-transparent bg-violet-600 hover:bg-violet-800 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-violet-200 group-hover:text-violet-400" aria-hidden="true" />
                </span>
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>

    </BaseLayout> */}

    <div className="rounded-lg mt-2 mb-14 pb-2 pt-4  bg-white px-1 sm:px-3 lg:px-3 ">
      <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-3 md:gap-y-10">
        <div className="relative">
          <dd className="mt-6 mb-1">
          <Image
              className="rounded-lg object-cover"
              src="/work_chat.svg"
              alt="kapacitor"
              width="200"
              height="120"
              layout="responsive"
              priority
            />
          </dd>
        </div>
        <div className="relative sm:pt-8 lg:pt-0.5 hidden md:block">
          <dd>
          <div className="flex h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
         
            <h2 className="mt-6 text-left text-3xl font-normal tracking-tight text-gray-600">
              ระบบจัดการวางแผนพัสดุ
            </h2>
          </div>
          <form className="mt-8 space-y-10" onSubmit={ verify }>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
            
                <label className="sr-only">
                  รหัสพนักงาน
                </label>
                <input
                  id="employeeid"
                  name="employeeid"
                  type="number"
                  autoComplete="current-username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="รหัสพนักงาน"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  รหัสผ่าน
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="รหัสผ่าน"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 text-violet-600 focus:ring-violet-500"
                />
                <label className="ml-2 block text-sm text-gray-600">
                  จำรหัสผ่าน
                </label>
              </div>
            </div>

              <button
                type="submit" 
                className="group relative flex w-full  justify-center rounded-md border border-transparent bg-violet-600 hover:bg-violet-800 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-violet-200 group-hover:text-violet-400" aria-hidden="true" />
                </span>
                เข้าสู่ระบบ
              </button>
       
          </form>
        </div>
      </div>
          </dd>
        </div> 
      </dl>
  </div> 
    </BaseLayout> 
    </>
    

  )
 
}

export default Grant