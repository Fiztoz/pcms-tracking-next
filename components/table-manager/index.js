import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useFilters,useSortBy,usePagination,useRowSelect } from 'react-table';
import ColumnFilter from './ColumnFilter';
import GlobalFilter from './GlobalFilter';
import { COLUMNS } from './columns';
import Modal from '../form-edit';
//import { Checkbox } from './Checkbox';


export default function TableManager() {

  const [fdata, setFdata] = useState(
    {
      bid_no: null, 
      budget: null,
      date_contract: null,
      detail_plan: null,
      id: 0, 
      item_name:null, 
      item_no: null,
      list_no: null,
      owner: null,
      quantity: null,
      remark: null,
      status: null,
      unit: null,
      year_budget:null
    }
  );
  
  

  const columns = useMemo(() => COLUMNS, []);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    };
  }, []);

  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);

	const url = `${process.env.NEXT_PUBLIC_API_BACKEND}/api/stocks`;
  const itemUrl = `${process.env.NEXT_PUBLIC_API_BACKEND}/api/items`;

	useEffect(() => {
		
    fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      var mapped = resp.data.map(function(obj) {
        return {
          "id": obj.id,
           "quantity": obj.attributes.quantity,
           "unit": obj.attributes.unit,
           "budget": obj.attributes.budget,
           "status": obj.attributes.status,
           "remark": obj.attributes.remark,
           "owner": obj.attributes.owner,
           "year_budget": obj.attributes.year_budget,
           "detail_plan": obj.attributes.detail_plan,
           "bid_no": obj.attributes.bid_no,
           "list_no": obj.attributes.list_no,
           "item_no": obj.attributes.item_no,
           "item_name": obj.attributes.item_name,
           "date_contract": obj.attributes.date_contract,
           "updatedAt" : obj.attributes.updatedAt
             };
        });
        
        console.log(mapped);

        let reversed = mapped.reverse()

        // function compare( a, b ) {
        //   if ( a.list_no > b.list_no ){
        //     return -1;
        //   }
        //   if ( a.list_no < b.list_no ){
        //     return 1;
        //   }
        //   return 0;
        // }

        // let sorted = mapped.sort( compare )

        setData(reversed)		

     })

     fetch(itemUrl)
     .then((resp) => resp.json())
     .then((resp) => {
       var mapped = resp.data.map(function(obj) {
         return {
            "item_no": obj.attributes.item_no,
            "item_name": obj.attributes.item_name,
            "item_unit": obj.attributes.item_unit,
              };
         });   
         console.log(mapped);
         setItem(mapped)		
      })

	}, []);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    rows,
    prepareRow,
    selectedFlatRows,
    allColumns,
    getToggleHideAllColumnsProps,
    state: { globalFilter,selectedRowIds },
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    pageCount,
    setPageSize
  } = useTable({
    columns,
    data,
    defaultColumn,
    disableSortRemove: true,
    initialState: { pageIndex: 1 }
  },
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useRowSelect,
  hooks => {
    hooks.visibleColumns.push(columns => {
      return [
        ...columns,
        // {
        //   id: 'selection',
        //   Header: ({ getToggleAllRowsSelectedProps }) => (
        //     <Checkbox {...getToggleAllRowsSelectedProps()} />
        //   ),
        //   Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
        // },
        // {
        //   id: 'editButton',
        //   Header: 'Edit',
         
        //   Cell: ({ row }) => (
        //     // <button onClick={() => console.log("heyyyyyyy")}>?????????????????????????????????</button>
        //     <button onClick={() => {
        //       console.log(row.original)
        //     }}>?????????????????????????????????</button>
        //   )
        // },
        // {
        //   id: 'deleteButton',
        //   Header: '???????????????',
        //   Cell: ({ row }) => (
     
        //     <button className="inline-flex items-center font-light  bg-rose-500 hover:bg-rose-400 px-3 py-1 rounded-lg text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            
        //     onClick={() => {
           
        //       console.log(row.original.id)

        //         // alert("ddddddd" +row.original.id)

				// var myHeaders = new Headers();
        //         myHeaders.append("Authorization", "Bearer cff0c3992591b70c40eab298c01cb784593fd949f9f01a3e1af4c0f184ccb3a7e496c545c15c11b883cb866bf662235a8b4dfd61a1734922dacfe1b0133b54eb07574016474eb795d0e58d700675967de05fb015b5026bad55e71690395aa35aaa519fb07e0d4268a87899af6609b68e0496efc66faa1396fd99b7f3380cc986");

				// var requestOptions = {
				// method: 'DELETE',
				// headers: myHeaders,
				// redirect: 'follow'
				// };

				// fetch(`http://localhost:1337/api/stocks/${row.original.id}`, requestOptions)
				// .then(response => response.text())
				// .then(result => location.reload())
				// .catch(error => console.log('error', error));

        //     }}>

        //  <svg className="mr-2" fill='#FFFFFF' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="20px" height="20px">
        //   <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg> 
        //     ??????
        //   </button>
        //   )
        // },
        
        
      ];
    });
  }
  );

  return (
   <>
      <Modal data={ fdata }  item ={ item } />
    
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <div className="pt-5 px-5 grid gap-4 grid-cols-4 auto-cols-max">
      
        {allColumns.map(column => (
          
          <div className="flex items-center" key={column.id}>
              <input checked  type="checkbox" {...column.getToggleHiddenProps()}
                   className="accent-violet-500 w-4 h-4 checked text-violet-600 bg-violet-900 rounded border-violet-300 focus:ring-violet-500" />
              <label 
                  className="ml-2 text-sm font-normal  text-black"> {column.Header}</label>
          </div>

        ))}  
      </div>

     <div className="mb-10 mt-4 mx-4 overflow-x-auto relative shadow-md sm:rounded-lg">
      <table {...getTableProps() } className="w-full text-sm text-left ">
        <thead className="whitespace-nowrap text-xs bg-violet-600 text-violet-100">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th scope="col" className="py-2 px-4" {...column.getHeaderProps(column.getSortByToggleProps({ title: "" }))}>{column.render('Header')}
                 <div>{column.canFilter ? column.render('Filter') : null}</div>
                 <span>
                    {column.isSorted ? (column.isSortedDesc ? '' : '') : ''}
                    {/* {column.isSorted ? (column.isSortedDesc ? '????' : '????') : ''} */}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} 
              //click row active
              onClick={() => setFdata(row.original)}
              className="font-light text-gray-900  border-b bg-violet-50  hover:bg-violet-700 hover:text-white">
                {row.cells.map(cell => {
                  return (
                    <td className="py-1 px-4 whitespace-nowrap " {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      </>
  );
};

