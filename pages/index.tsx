import React from 'react';
import { BaseLayout,AddRow, TableManager,Navbar } from '../components';

export default function Home() {
  return (
    <>
     <Navbar main={true} dashboard={false} datamanager={false} />
       <BaseLayout>
        <AddRow/>
        <TableManager/>
       </BaseLayout>
    </>
   

  );
}
