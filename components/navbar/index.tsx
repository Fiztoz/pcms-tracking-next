import React,{Fragment} from 'react';
import { Disclosure,Menu, Transition } from '@headlessui/react'
import { Bars3Icon,BellIcon, XMarkIcon } from '@heroicons/react/24/solid'

import { NavRight,ButtonLogout } from '../index'

import { motion } from 'framer-motion';
import { FaChartPie } from "react-icons/fa";


export default function Navbar({main,dashboard,datamanager}) {

  const navigation = [
    { name: 'หน้าหลัก', href: '/', current: main},
    { name: 'รายงานผู้บริหาร', href: 'dashboard', current: dashboard },
    { name: 'จัดการข้อมูล', href: 'datamanager', current: datamanager },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

    return (
      <>
      {/* <Disclosure as="nav" className="sticky top-0 z-10 px-3 bg-white md:bg-opacity-5  backdrop-blur-md"> */}
      <Disclosure as="nav" className="sticky top-0 z-10 px-3 bg-violet-600   backdrop-blur-md">
      {({ open }) => (
        <>
         <div className='absolute md:hidden p-3'>
               
         </div>
          <div className="px-4 sm:px-4 lg:px-3">
            <div className="flex items-center h-16 justify-end md:justify-between ">
              <div className="flex items-center">
                <div className="hidden md:block ">
                  <div className="ml-0 flex items-baseline space-x-4">
                  <FaChartPie className=' text-white justify-center'/>
                    {navigation.map((item) => (
                    
                      <a 
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-violet-700 text-white'
                            : 'bg-violet-400 text-white hover:bg-violet-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                 
                </div>
              
              </div>
              <div className="px-2">
                 <ButtonLogout/>
              </div>
              <div className="mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-violet-800 inline-flex items-center justify-center p-1 rounded-md text-gray-50 hover:text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-violet-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <Bars3Icon className="block h-5.5 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-5.5 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
          <motion.div
              initial={{ opacity: 0, x:10 }}
              whileInView={{ opacity: 1, x:0 }}
              // viewport={{ once: true }}
              transition={{ duration: 0.05 }}
            >
            <NavRight/>

          </motion.div>  
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
   
    </>  
    )
  }