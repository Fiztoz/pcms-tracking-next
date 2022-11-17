import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { list } from 'postcss';


export default function Modal({ data }) {

  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  useEffect(() => {

    function editForm(){

      console.log(data)
      if(data.id != 0){
        setOpen(true)
        console.log("data avail")
      } else {
        console.log("sorry")
      }

    }
    editForm();
  }, [data]);


  function editRow(event){

    event.preventDefault() // don't redirect page
    console.log("create data list")
    

    for (let i = 1; i <= event.target.list_no.value; i++) {
       
          let rowData ={
                "data": {
                          "quantity": null,
                          "unit": null,
                          "budget": null,
                          "status": null,
                          "remark": null,
                          "owner": null,
                          "year_budget": event.target.year_budget.value,
                          "detail_plan": event.target.detail_plan.value,
                          "bid_no": event.target.bid_no.value,
                          "list_no": i,
                          "item_no": null,
                          "item_name": null,
                          "date_contract": "2021-11-09"
                      }
              }
        

        var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer cff0c3992591b70c40eab298c01cb784593fd949f9f01a3e1af4c0f184ccb3a7e496c545c15c11b883cb866bf662235a8b4dfd61a1734922dacfe1b0133b54eb07574016474eb795d0e58d700675967de05fb015b5026bad55e71690395aa35aaa519fb07e0d4268a87899af6609b68e0496efc66faa1396fd99b7f3380cc986");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(rowData);
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:1337/api/stocks", requestOptions)
  .then(response => response.json())
  //.then(result => console.log(result))
  .then(result => {
    console.log(result)
    if(i == event.target.list_no.value){
       location.reload()
    }
   
 })
  .catch(error => console.log('error', error));

      }

  }

  return (
    <>
       <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={setOpen}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-x-auto rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Bid No. {data.bid_no} รายการที่ { data.list_no } 
                      </Dialog.Title> 
                       <p>งบประมาณ {data.year_budget} : {data.detail_plan} </p>
                       <p className='text-sm text-gray-600'>ครบกำหนด { data.date_contract} </p>
                      <div className="mt-2">
                    
                        <form onSubmit={ editRow }>
                <div className="overflow-hidden  sm:rounded-md">
                  <div className="bg-white px-0 py-5 sm:p-6">




                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-2">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                         รหัสพัสดุ
                        </label>
                        <input
                          type="text"
                          id="item_no"
                          name="item_no"
                          required
                          className="mt-1 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                      <div className="col-span-4">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          ชื่อพัสดุ
                        </label>
                        <input
                          type="text"
                          id="bid_no"
                          name="bid_no"
                          required
                          className="mt-1 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                         จำนวน
                        </label>
                        <input
                          type="text"
                          id="item_no"
                          name="item_no"
                          required
                          className="mt-1 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                      <div className="col-span-2">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          หน่วยนับ
                        </label>
                        <input
                          type="text"
                          id="bid_no"
                          name="bid_no"
                          required
                          className="mt-1 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          วงเงินงบประมาณ
                        </label>
                        <input
                          type="text"
                          id="detail_plan"
                          name="detail_plan"
                          placeholder={data.budget}
                          required
                          className="mt-1 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          สถานะ
                        </label>
                        <select
                          id="list_no"
                          name="list_no"
                          required
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                          className="mt-1 block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                 
                  <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    // ref={cancelButtonRef}
                  >
                    ยกเลิก
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
      {/* <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                  
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        {data.id}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All of your data will be permanently
                          removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root> */}
     


    </>
  )
}
