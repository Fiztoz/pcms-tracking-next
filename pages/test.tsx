import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react'
//import React from 'react'

export async function getStaticProps(){
const data = await axios.get('https://restcountries.com/v3.1/all')
return {
props: {
countries: data.data
}
}
}

export default function Home({countries}) {
const [query, setQuery] = useState('');

//Our search filter function
  const searchFilter = (array) => {
  return array.filter(
    (el) => el.name.common.toLowerCase().includes(query)
  )
  }

//Applying our search filter function to our array of countries recieved from the API
  const filtered = searchFilter(countries)

//Handling the input on our search bar
const handleChange = (e) => {
setQuery(e.target.value)
}

return (
<div className={`bg-gray-100`}>
<Head>
<title>Rest Countries</title>
<meta name="description" content="Generated by create next app" />
<link rel="icon" href="/favicon.ico" />
</Head>
<div className='w-11/12 m-auto mt-40 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-0'>
<input onChange={handleChange} type='text' placeholder='Search...'/>
</div>

<div className='w-11/12 m-auto md:grid mt-10 gap-10 md:grid-cols-4 flex flex-col'>

 /* here we map over the filtered elements and display each item as a card  */
{filtered.map((country) => (
<div className='bg-white shadow-lg rounded-md overflow-hidden h-[25rem] cursor-pointer'>
<img src={country.flags.png} alt='Country card' className='h-56 w-full object-cover'/>
<span className='px-3 py-2 block font-bold text-xl'>{country.name.common}</span>
<span className='px-3 py-2 block'><span className='font-bold'>Popoulation:</span> <span className='font-light'>{country.population}</span></span>
<span className='px-3 py-2 block'><span className='font-bold'>Region:</span> <span className='font-light'>{country.region}</span></span>
<span className='px-3 py-2 block'><span className='font-bold'>Capital:</span> <span className='font-light'>{country.capital}</span></span>
</div>
))}
</div>
</div>
)
}