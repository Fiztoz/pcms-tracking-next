import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaSistrix } from "react-icons/fa";
import { da } from 'date-fns/locale';

export default function Modal({ data, item }) {

///////////item query/////////
  const [query, setQuery] = useState('');
  const [itemx, setItemx] = useState({
    item_no: data.item_no,
    item_name:data.item_name,
    item_unit: data.unit
  });

//Our search filter function
  const searchFilter = (array) => {
    return array.filter(
      (el) => el.item_no.includes(query)
    )
  }

//Applying our search filter function to our array of countries recieved from the API
  const filtered = searchFilter(item)

//Handling the input on our search bar
const handleChange = (e) => {
  setQuery(e.target.value)
}

  const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BACKEND}/api/stocks`;

  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)

  const cancelButtonRef = useRef(null)
 
  useEffect(() => {

    function openForm(){
      // console.log(data)
      // console.log(item)
      if(data.id != 0){
        setOpen(true)
        setItemx(prev => ({...prev,
          item_no : data.item_no,
          item_name : data.item_name,
          item_unit: data.unit,
          }))  
        console.log("have data")
        console.log(data)
      } else {
        console.log("not data")
      }
    }

    openForm();
  }, [data]);

 
  function closeEditbox(){
    setOpen(false)
  }

  function editRow(event){

    event.preventDefault() // don't redirect page
    console.log("update data list")
  
    let rowData ={
                      "data": {
                                "quantity": event.target.quantity.value,
                                "unit": event.target.unit.value,
                                "budget": event.target.budget.value,
                                "status": event.target.status.value,
                                "remark": event.target.remark.value,
                                "owner": "xxx",
                                "item_no": event.target.item_no.value,
                                "item_name": event.target.item_name.value
                            }
                    }
      console.log(rowData)

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer cff0c3992591b70c40eab298c01cb784593fd949f9f01a3e1af4c0f184ccb3a7e496c545c15c11b883cb866bf662235a8b4dfd61a1734922dacfe1b0133b54eb07574016474eb795d0e58d700675967de05fb015b5026bad55e71690395aa35aaa519fb07e0d4268a87899af6609b68e0496efc66faa1396fd99b7f3380cc986");
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify(rowData);
      
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch(`${ API_ENDPOINT}/${data.id}`, requestOptions)
        .then(response => response.text())
        .then(result => location.reload())
        .catch(error => console.log('error', error));

  }

  function deleteRow(){
    //console.log("rm"+data.id)
    var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer cff0c3992591b70c40eab298c01cb784593fd949f9f01a3e1af4c0f184ccb3a7e496c545c15c11b883cb866bf662235a8b4dfd61a1734922dacfe1b0133b54eb07574016474eb795d0e58d700675967de05fb015b5026bad55e71690395aa35aaa519fb07e0d4268a87899af6609b68e0496efc66faa1396fd99b7f3380cc986");

				var requestOptions = {
				method: 'DELETE',
				headers: myHeaders,
				redirect: 'follow'
				};

				fetch(`${ API_ENDPOINT}/${data.id}`, requestOptions)
				.then(response => response.text())
				.then(result => location.reload())
				.catch(error => console.log('error', error));
  }

const [form, setForm] = useState({
  phone: ''
});

const normalizePhone = (value, previousValue) => {
  // Any value at all?
  if (!value) return value;
  // replace method to only allow digits 1-9
  const nums = value.replace(/[^\d]/g, ""); // only allows 0-9
  // If the length of value is greater than nothing
  if (!previousValue || value.length > previousValue.length) {
    // Is the length = 3? If true, add a parentheses to each side (123)
    if (nums.length === 3) return `(${nums})`;
    // Is the length = 6? If true, add a parentheses to each side (123)
    // and add the other three numbers
    if (nums.length === 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}`;
    // These next two statements cover everything in between all numbers being equal
    if (nums.length <= 3) return nums;
    if (nums.length <= 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}-`;
    // Finally add add a parentheses to each side (123)
    // Add the next three numbers
    // Add a hyphen and the last 4 numbers
    return `(${nums.slice(0, 3)}) ${nums.slice(3, 6)}-${nums.slice(6, 10)}`;
  }
};

const normalizeItem_no = (value, previousValue) => {
  // Any value at all?
  if (!value) return value;
  // replace method to only allow digits 1-9
  const nums = value.replace(/[^\d]/g, ""); // only allows 0-9
  console.log(nums)
  // If the length of value is greater than nothing
  if (!previousValue || value.length > previousValue.length) {
    // Is the length = 3? If true, add a parentheses to each side (123)
    if (nums.length === 1) return `${nums}-`;
    if (nums.length === 2) return `${nums.slice(0, 1)}-${nums.slice(1, 4)}`;
    // Is the length = 6? If true, add a parentheses to each side (123)
    // and add the other three numbers
    // if (nums.length === 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}`;
    // These next two statements cover everything in between all numbers being equal
    // if (nums.length <= 3) return nums;
    // if (nums.length <= 6) return `(${nums.slice(0, 3)}) ${nums.slice(3)}-`;
    // Finally add add a parentheses to each side (123)
    // Add the next three numbers
    // Add a hyphen and the last 4 numbers
    return `${nums.slice(0, 1)}-${nums.slice(1, 4)}-${nums.slice(4, 8)}`;
  }
};


function getItemData(){
  console.log("get item data")
  setShow(true)

}


  return (
    <>

      <Transition.Root show={open} as={Fragment}>
      
      <Dialog  className="relative z-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
 
        </Transition.Child>

        <div className="fixed inset-0 z-auto overflow-y-auto">
       
          <div className="flex min-h-full items-end justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-x-auto rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">                
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Bid No. {data.bid_no} รายการที่ { data.list_no } 
                      </Dialog.Title> 
                  
                       <p>งบประมาณ {data.year_budget} : {data.detail_plan} </p>
                       <p className='text-sm text-gray-600'>ครบกำหนด { data.date_contract} </p> 
                       <p className='text-sm text-gray-600'>ข้อมูลเมื่อ { data.updatedAt } </p> 
                      <div className="mt-2">
                      
                <form onSubmit={ editRow }>

                <div className="overflow-hidden  sm:rounded-md">
                  <div className="bg-white px-0 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-2">
                  
                        <label htmlFor="first-name" className="blocktext-sm font-medium text-gray-700">
                         รหัสพัสดุ  
                            <button className='px-4' type="button"  
                                    onClick={
                                      //() => console.log("GGGGGG")
                                      getItemData
                                      } >
                                <FaSistrix/>
                            </button>
                        </label>
                        
                        {show ? (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div className="bg-white px-16 py-14 rounded-md text-center">
          <h1 className="text-xl mb-4 font-bold text-slate-500">ค้นหาพัสดุ</h1>
          <input
  placeholder="รหัสพัสดุ"
  onChange={handleChange}
/>

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                  {
                    filtered.map((show) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={show.item_no}>
                        <td  
                        onClick={ 
                          ()=> { 
                           setItemx(prev => ({...prev,
                            item_no : show.item_no,
                            item_name : show.item_name,
                            item_unit: show.item_unit,
                            }))  
                           setShow(false)
                        }
                        } className="break-words px-6 py-2">{show.item_no}:{show.item_name}</td>
                    </tr>
                    ))
                  }
                </tbody>
              </table>


          <button className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            onClick= {() => setShow(false)}
          >
            ออก
            
            </button>

        </div>
      </div>
        ) : 
        null
        }
   
                        <input
                          type="text"
                          id="item_no"
                          name="item_no"
                          // onChange={normalizeInput} 
                          //defaultValue={data.item_no}
                          // defaultValue = { 
                          // // data.item_no ? 'a': data.item_no.slice(0, 1)+ '-'+ data.item_no.slice(1, 4)+'-'+data.item_no.slice(4, 8)
                          //  data.item_no ? data.item_no.slice(0, 1)+ '-'+ data.item_no.slice(1, 4)+'-'+data.item_no.slice(4, 8): itemx.item_no
                          //  } 
                          onChange={
                            //() => console.log("GGGGGG")
                            getItemData
                            }
                          disabled
                          //defaultValue={ itemx.item_no }
                          value={ itemx.item_no ?? '' }
                          required
                          className="bg-gray-100 mt-1 font-light px-3 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                      <div className="col-span-4">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          ชื่อพัสดุ 
                        </label>
                        <input
                          type="text"
                          id="item_name"
                          name="item_name"
                          value={itemx.item_name ?? '' }
                          disabled
                          className="bg-gray-100 mt-1 font-light px-3 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        

                      
                      </div>

                      <div className="col-span-4">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                         จำนวน
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          defaultValue={data.quantity}
                          required
                          className="mt-1 font-light px-3 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          หน่วยนับ
                        </label>
                        <input
                          type="text"
                          id="unit"
                          name="unit"
                          disabled
                          value={itemx.item_unit ?? ''}
                          //defaultValue={ data.unit}
                          //required
                          className="bg-gray-100 mt-1 font-light px-3 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-4">
                        <label className="block text-sm font-medium text-gray-700">
                          วงเงินงบประมาณ
                        </label>
                        <input
                          type="number"
                          step=".01"
                          id="budget"
                          name="budget"
                          defaultValue={data.budget}
                          required
                          className="mt-1 font-light px-3 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          สถานะ
                        </label>
                        <select
                          id="status"
                          name="status"
                          required
                          defaultValue={data.status}
                          className="mt-1 font-light block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>รอดำเนินการ</option>
                          <option>อยู่ระหว่างดำเนินการแล้ว</option>
                          <option>ดำเนินการแล้วเสร็จ</option>
                          
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                         รายละเอียด/ปัญหา
                        </label>
                        <textarea
                          type="text"
                          name="remark"
                          id="remark"
                          rows="4"
                          defaultValue={data.remark}
                          className="mt-1 font-light px-3 block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                 
                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    //onClick={() => setOpen(false)}
                    onClick={ closeEditbox }
                  >
                    ยกเลิก
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => deleteRow()}
                  >
                    ลบ
                  </button>
        
                  <button
                type="submit" 
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 hover:bg-violet-800 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                ยืนยันการปรับปรุงข้อมูล
              </button>
                 
                </div>
                </div>
              </form>
                      </div>
                    </div>
                  </div>
                </div>
               
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}
