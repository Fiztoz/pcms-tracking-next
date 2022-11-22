import Link from "next/link";
import React from "react";


export default function Footer() {


  return (
 
<footer className="hidden md:block text-center bg-violet-700 text-white">
  <div className="justify-end pt-4 mb-2">

  <Link href="https://www.facebook.com/Provincial.Electricity.Authority">
  <button  
    className="rounded-full bg-white bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-5  w-9 h-9 m-1"
    type="button">
      <svg
      data-icon="facebook"
      className="w-6 h-full mx-auto"
      role="img"
      xmlns="http://www.w3.org/2000/svg"  
      viewBox="0 0 30 30"
      >    
      <path fill="currentColor" 
      d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"/>
      </svg>
      </button>  
  </Link>

  <Link href="https://twitter.com/pea_thailand">
  <button  
    className="rounded-full bg-white bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-5  w-9 h-9 m-1"
    type="button">
      <svg 
         data-icon="twitter"
         className="w-4 h-full mx-auto"
         role="img"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 512 512"
      >
      <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
      </svg>
      </button>  
  </Link>

  <Link href="https://www.youtube.com/user/PEAchannelThailand">
  <button  
    className="rounded-full bg-white bg-opacity-10 hover:bg-gray-200 hover:bg-opacity-5  w-9 h-9 m-1"
    type="button">
      <svg 
      data-icon="youtube"
      className="w-6 h-full mx-auto"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30" 
      >    
      <path fill="currentColor"  d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"/>
      </svg>
      </button>  
  </Link>
  </div>

  <div className="py-2">
    <p className="mb-2 break-words text-white text-sm text-primary-2"> 
    การไฟฟ้าส่วนภูมิภาค สำนักงานใหญ่ 200 ถนนงามวงศ์วาน ลาดยาว จตุจักร กรุงเทพ 10900   |   โทร : 02-589-0100 ถึง 1
    </p>
    <p className="mb-2 break-words text-white text-sm text-primary-2"> 
    © Copyright {new Date().getFullYear()}  by PEA     |    นโยบายเว็บไซต์ |    นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์   |    นโยบายการคุ้มครองข้อมูลส่วนบุคคล 
    </p>
  </div>

</footer>
  )
}