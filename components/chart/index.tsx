import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LinearScale,BarElement, CategoryScale, RadialLinearScale,PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea, Radar } from 'react-chartjs-2';

ChartJS.register( LinearScale,CategoryScale,RadialLinearScale,PointElement, LineElement,BarElement, ArcElement, Tooltip, Legend);

export default function ChartShow() {
  const [datapolar,setDatapolar] = useState({
    labels:[],
    datasets:[]
  })

  const [dataradar,setDataradar] = useState({
    labels:[],
    datasets:[]
  })

  function loadpolardata(){
    fetch("/polardata.json")
    .then((res) => res.json())
    .then((json)=>  
        setDatapolar(prev => ({...prev,
          labels : json.labels,
          datasets : json.datasets
          })) 
    )
  }

  function loadradardata(){
    fetch("/radardata.json")
    .then((res) => res.json())
    .then((json)=>  
        setDataradar(prev => ({...prev,
          labels : json.labels,
          datasets : json.datasets
          })) 
    )
  }

  useEffect(()=> {
       loadpolardata()
       loadradardata()   
  },[])

 
  return (
  <>
   <div className="rounded-lg  mb-5 bg-white">
     <dl className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-2">
       <div className="px-5 py-5 relative">
       <p className="text-lg leading-6 font-medium text-gray-900">Tokenomics</p>
       <p className="mt-2 text-xs leading-3 font-medium text-gray-600">Total max supply : 6,000,000,000 KAP</p>
       <p className="mt-2 mb-4 text-xs leading-3 font-medium text-gray-600">Initial circulating supply : 30,000,000 KAP</p>

       <PolarArea data={ datapolar }/>
        </div>

        <div className="m-5 py-10 relative">
        <p className="text-lg leading-6 font-medium text-gray-900">Compare Existing and New Techology</p>

       <Radar data={dataradar} />
        </div>
      </dl>
    </div>
  </>
  )
  
}
