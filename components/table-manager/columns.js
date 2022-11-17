import { format } from 'date-fns';
import ColumnFilter from './ColumnFilter';

export const COLUMNS = [
  // {
  //   Header: 'No',
  //   accessor: 'id',
  //   Footer: 'No',
  //   // Filter: ColumnFilter,
  //   //disableFilters: true
  // },
  {
    Header: 'ปีที่ได้รับงบประมาณ',
    accessor: 'year_budget',
    Footer: 'ปีที่ได้รับงบประมาณ'
    // Filter: ColumnFilter
  },
  {
    Header: 'รายการแผนการจัดซื้อ/จ้าง/เช่า',
    accessor: 'detail_plan',
    Footer: 'รายการแผนการจัดซื้อ/จ้าง/เช่า',
    //Filter: ColumnFilter
  },
  // {
  //   Header: 'Date of Birth',
  //   accessor: 'date_of_birth',
  //   Footer: 'Date of Birth',
  //   Cell: ({ value }) => {
  //     return format(new Date(value), 'dd/MM/yyyy');
  //   }
  //   // Filter: ColumnFilter
  // },
  {
    Header: 'Bid No.',
    accessor: 'bid_no',
    Footer: 'Bid No.'
    // Filter: ColumnFilter
  },
  {
    Header: 'รายการที่',
    accessor: 'list_no',
    Footer: 'รายการที่'
    // Filter: ColumnFilter
  },
  {
    Header: 'รหัสพัสดุ',
    accessor: 'item_no',
    Footer: 'รหัสพัสดุ'
    // Filter: ColumnFilter
  },
  {
    Header: 'ชื่อพัสดุ',
    accessor: 'item_name',
    Footer: 'ชื่อพัสดุ'
    // Filter: ColumnFilter
  },
  {
    Header: 'จำนวน',
    accessor: 'quality',
    Footer: 'จำนวน',
    disableFilters: true
    // Filter: ColumnFilter
  },
  {
    Header: 'หน่วยนับ',
    accessor: 'unit',
    Footer: 'หน่วยนับ',
    disableFilters: true
    
  },
  {
    Header: 'วงเงินงบประมาณ',
    accessor: 'budget',
    Footer: 'วงเงินงบประมาณ',
    disableFilters: true
    // Filter: ColumnFilter
  },
  {
    Header: 'สถานะ',
    accessor: 'status',
    Footer: 'สถานะ'
    // Filter: ColumnFilter
  },
  {
    Header: 'วัน/เดือน/ปี',
    accessor: 'date_contract',
    Footer: 'วัน/เดือน/ปี',
    disableFilters: true
  },
  {
    Header: 'รายละเอียดปัญหาอุปสรรค',
    accessor: 'remark',
    Footer: 'รายละเอียดปัญหาอุปสรรค',
    disableFilters: true
  },
  {
    Header: 'วันที่แก้ไขข้อมูล',
    accessor: 'updatedAt',
    Footer: 'วันที่แก้ไขข้อมูล',
    Cell: ({ value }) => {
           return format(new Date(value), 'dd/MM/yyyy');
        },
    disableFilters: true
  },
  {
    Header: 'ผู้ที่รับผิดชอบ',
    accessor: 'owner',
    Footer: 'ผู้ที่รับผิดชอบ',
    disableFilters: true
  }
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
    Footer: 'Id'
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      { Header: 'שם פרטי', accessor: 'first_name', Footer: 'First Name' },
      { Header: 'שם משפחה', accessor: 'last_name', Footer: 'Last Name' }
    ]
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of Birth',
        accessor: 'date_of_birth',
        Footer: 'Date of Birth'
      },
      { Header: 'Country', accessor: 'country', Footer: 'Country' },
      { Header: 'Phone', accessor: 'phone', Footer: 'Phone' }
    ]
  }
];
