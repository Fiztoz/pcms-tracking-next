import React from 'react';
import { BaseLayout,AddRow, TableManager,Navbar } from '../components';

export default function dataManager() {
  return (
    <>
     <Navbar main={true} dashboard={false} datamanager={false} stations={false} />
       <BaseLayout>
        <AddRow/>
        <TableManager/>
       </BaseLayout>
    </>
  );
}

dataManager.requireAuth = true