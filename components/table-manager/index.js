import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useFilters,useSortBy,usePagination,useRowSelect } from 'react-table';
import ColumnFilter from './ColumnFilter';
import GlobalFilter from './GlobalFilter';
import { COLUMNS } from './columns';
//import { Checkbox } from './Checkbox';

export default function TableManager() {

  const columns = useMemo(() => COLUMNS, []);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    };
  }, []);

  const [data, setData] = useState([]);

	const url = "http://localhost:1337/api/stocks";

	useEffect(() => {
		
    fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      var mapped = resp.data.map(function(obj) {
        return {
          "id": obj.id,
           "quantity": obj.attributes.item_name,
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
             };
        });
        
        console.log(mapped);
        setData(mapped)		
    })


	}, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
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
        {
          id: 'xbutton',
          Header: 'Edit',
         
          Cell: ({ row }) => (
            <button onClick={() => console.log("heyyyyyyy")}>แก้ไขข้อมูล</button>
          )
        },
        {
          id: 'button',
          Header: 'Delete',
          Cell: ({ row }) => (
            // <button onClick={() => console.log(row.original)}>Del</button>
            // <button onClick={ test }>ลบแถว</button>
            <button onClick={() => {
              console.log("ddddddddd")
              console.log(row.original)
              console.log(row.original.id)

                // console.log("Row Data: " , rowData)
                alert("ddddddd" +row.original.id)

				var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer cff0c3992591b70c40eab298c01cb784593fd949f9f01a3e1af4c0f184ccb3a7e496c545c15c11b883cb866bf662235a8b4dfd61a1734922dacfe1b0133b54eb07574016474eb795d0e58d700675967de05fb015b5026bad55e71690395aa35aaa519fb07e0d4268a87899af6609b68e0496efc66faa1396fd99b7f3380cc986");

				var requestOptions = {
				method: 'DELETE',
				headers: myHeaders,
				redirect: 'follow'
				};

				fetch(`http://localhost:1337/api/stocks/${row.original.id}`, requestOptions)
				.then(response => response.text())
				.then(result => location.reload())
				.catch(error => console.log('error', error));

            }}>ลบแถวนี้</button>
          )
        },
        
        
      ];
    });
  }
  );

  return (
   <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <div className="pt-5 px-5 grid gap-4 grid-cols-4 auto-cols-max">
      
        {allColumns.map(column => (
          
          <div className="flex items-center" key={column.id}>
              <input checked  type="checkbox" {...column.getToggleHiddenProps()}
                   className="accent-violet-500 w-4 h-4 checked text-violet-600 bg-violet-900 rounded border-violet-300 focus:ring-violet-500" />
              <label 
                  className="ml-2 text-sm font-medium text-black"> {column.Header}</label>
          </div>

        ))}  
      </div>

     <div className="mt-4 mx-4 overflow-x-auto relative shadow-md sm:rounded-lg">
      <table {...getTableProps() } className="w-full text-sm text-left ">
        <thead className="whitespace-nowrap text-xs bg-violet-600 text-violet-100">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th scope="col" className="py-2 px-4" {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                 <div>{column.canFilter ? column.render('Filter') : null}</div>
                 <span>
                    {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : 'กรอง'}
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
              <tr  {...row.getRowProps()} className=" text-gray-900  border-b bg-violet-50  hover:  hover:bg-violet-700 hover:text-white">
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

      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        | Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
        />
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show: {pageSize}
            </option>
          ))}
        </select>
        <button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
          {'<<'}
        </button>
        <button disabled={!canNextPage} onClick={() => nextPage()}>
          Next
        </button>
        <button disabled={!canPreviousPage} onClick={() => previousPage()}>
          Previous
        </button>
        <button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
          {'>>'}
        </button>
      </div>

      </>
  );
};

