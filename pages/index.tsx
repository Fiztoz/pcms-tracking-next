import React from 'react';
import Image from 'next/image'
import { BaseLayout,AddRow, TableManager,Navbar } from '../components';

export default function Home() {
  return (
    <>
     <Navbar main={true} dashboard={false} datamanager={false} />
       <BaseLayout>

      <div className='py-5 px-3'>
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
