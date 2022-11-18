import { BaseLayout,AddRow, TableManager,Navbar, ChartShow } from '../components';

export default function Dashboard() {
  return (
    <>
     <Navbar main={false} dashboard={true} dataimport={false} />
       <BaseLayout>
      <ChartShow />
       </BaseLayout>
    </>
   

  );
}
