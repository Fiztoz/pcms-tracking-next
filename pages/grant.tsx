import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { useAuth } from "../services/AuthProvider"

import React, { Fragment,useEffect, useRef, useState } from "react"
import { BaseLayout, Navbar } from '../components'

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
    console.log("Heyyyyyyy")
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
                    // console.log(data)
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

    <Navbar main={false} dashboard={false} dataimport={true} />
    <BaseLayout>
      
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
         
            <h2 className="mt-6 text-center text-3xl font-normal tracking-tight text-gray-600">
              PCMS Tracking
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={ verify }>
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

            <div>
              <button
                type="submit" 
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 hover:bg-violet-800 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-violet-500 group-hover:text-violet-400" aria-hidden="true" />
                </span> */}
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="inline-flex items-center text-lg font-medium leading-6 text-gray-900"
                  >
                    <svg className="mr-2 w-10 h-10 text-red-500" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7L12 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17.01L12.01 16.9989" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {modalbox.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                       {modalbox.message}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="text-red-600 bg-transparent hover:bg-red-600 hover:text-white font-medium rounded-lg text-md py-2 px-4 text-center"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </BaseLayout>
    
    </>
  )
 
}

export default Grant