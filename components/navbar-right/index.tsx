import React from 'react'
import Link from 'next/link'
export default function NavRight() {
    return (
        <>
            <aside className="fixed right-0 z-10 w-full backdrop-blur-sm" aria-label="Sidebar">
                <div className='backdrop-blur-sm flex flex-row-reverse'>
                    <div className="flex w-1/2 min-h-screen overflow-y-auto py-4 px-3 rounded-l-md bg-violet-800">
                        <ul className="space-y-2">

                            <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                                <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9.5L12 4L21 9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <Link href={"/"} passHref>
                                    <span className="flex-1 ml-3">หน้าหลัก</span>
                                </Link>
                            </li>

                            <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>

                                <Link href={"/dashboard"} passHref>
                                    <span className="flex-1 ml-3">รายงานผู้บริหาร</span>
                                </Link>
                            </li>

                            <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                                <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <Link href={"/datamanager"} passHref>
                                    <span className="flex-1 ml-3">จัดการข้อมูล</span>
                                </Link>
                            </li>

                            {/* <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                                <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 20H4V4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 16.5L12 9L15 12L19.5 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <Link href={"/roadmaps"} passHref>
                                    <span className="flex-1 ml-3">Roadmaps</span>
                                </Link>
                            </li> */}

                            {/* <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>

                                <Link href={"/whitepaper"} passHref>
                                    <span className="flex-1 ml-3">White paper</span>
                                </Link>
                            </li> */}

                        </ul>
                    </div>
                </div>
            </aside>

        </>
    )
}