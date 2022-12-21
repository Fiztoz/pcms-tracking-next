import React from 'react';
import { BaseLayout,AddRow, TableManager,Navbar, ChartShow } from '../components';
import { useRouter } from 'next/router'

export default function Dashboard() {

  const router = useRouter()
  
  return (
    <>
     <Navbar main={false} dashboard={true} datamanager={false} stations={false} />
       <BaseLayout>
      <ChartShow />
       </BaseLayout>
    </>
   

  );
}

Dashboard.requireAuth = true