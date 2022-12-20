import React from 'react';
import Image from 'next/image'
import { BaseLayout,AddRow, TableManager,Navbar } from '../components';
import { useAuth } from '../services/AuthProvider';

export default function Home() {

  const { user } = useAuth()
  
  return (
    <>
     <Navbar main={true} dashboard={false} datamanager={false} />
       <BaseLayout>

      <div className='py-5 px-3'>
        <p>
        {user ? user.name : null}
        {user ? user.preferred_username : null}
        {user ? user.email : null}
        </p>
       
       <Image
              className="rounded-lg object-cover"
              src="/work_time.svg"
              alt="kapacitor"
               width="800"
               height="1200"
              // layout="responsive"
              priority
            />
        </div>
        {/* <AddRow/>
        <TableManager/> */}
       </BaseLayout>
    </>
   

  );
}
