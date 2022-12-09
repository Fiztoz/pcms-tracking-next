import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaSistrix } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddRow() {

  const [open, setOpen] = useState(false);
  const [type, setType] = useState('จัดซื้อ');
  const [startDate, setStartDate] = useState(new Date());
  const [equib, setEquib] = useState([]);
  const [planName, setPlanName] = useState([]);

  const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_BACKEND}/api/stocks`;

  const cancelButtonRef = useRef(null);

  function openForm() {
    setOpen(true);
  }

  function createRow(event) {
    event.preventDefault(); // don't redirect page
    console.log("create data list");

    for (let i = 1; i <= event.target.list_no.value; i++) {
      let rowData = {
        data: {
          quantity: null,
          unit: null,
          budget: null,
          status: null,
          remark: null,
          owner: null,
          year_budget: event.target.year_budget.value,
          detail_plan: event.target.detail_plan.value,
          bid_no: event.target.bid_no.value,
          list_no: i,
          item_no: null,
          item_name: null,
          date_contract: startDate,
        },
      };

      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer cff0c3992591b70c40eab298c01cb784593fd949f9f01a3e1af4c0f184ccb3a7e496c545c15c11b883cb866bf662235a8b4dfd61a1734922dacfe1b0133b54eb07574016474eb795d0e58d700675967de05fb015b5026bad55e71690395aa35aaa519fb07e0d4268a87899af6609b68e0496efc66faa1396fd99b7f3380cc986"
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(rowData);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(API_ENDPOINT, requestOptions)
        .then((response) => response.json())
        //.then(result => console.log(result))
        .then((result) => {
          console.log(result);
          if (i == event.target.list_no.value) {
            location.reload();
          }
        })
        .catch((error) => console.log("error", error));
    }
  }

  function setJobType(event){
    event.preventDefault(); // don't redirect page
    setType(event.target.value)
  }

  useEffect(() => {

     console.log("hhhhhhhhhh")
    function loadEquibName(){
      console.log("load equibbbb")
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer cff0c3992591b70c40eab298c01cb784593fd949f9f01a3e1af4c0f184ccb3a7e496c545c15c11b883cb866bf662235a8b4dfd61a1734922dacfe1b0133b54eb07574016474eb795d0e58d700675967de05fb015b5026bad55e71690395aa35aaa519fb07e0d4268a87899af6609b68e0496efc66faa1396fd99b7f3380cc986"
      );
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/equibps`, requestOptions)
      .then((resp) => resp.json())
      .then((resp) => {
        var mapped = resp.data.map(function(obj) {
          return {
             "equib_name": obj.attributes.equib_name,
               };
          });   
          console.log(mapped);
          setEquib(mapped);
     
       })
        .catch((error) => console.log("error", error));
    }

    function loadPlanlist(){
      console.log("load equibbbb")
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer cff0c3992591b70c40eab298c01cb784593fd949f9f01a3e1af4c0f184ccb3a7e496c545c15c11b883cb866bf662235a8b4dfd61a1734922dacfe1b0133b54eb07574016474eb795d0e58d700675967de05fb015b5026bad55e71690395aa35aaa519fb07e0d4268a87899af6609b68e0496efc66faa1396fd99b7f3380cc986"
      );
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/stocks`, requestOptions)
      .then((resp) => resp.json())
      .then((resp) => {
        var mapped = resp.data.map(function(obj) {
          return {
             "plan_name": obj.attributes.detail_plan,
               };
          });   
          console.log(mapped);
          
          const filteredArr = mapped.reduce((acc, current) => {
            const x = acc.find(item => item.plan_name === current.plan_name);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
         
          console.log(filteredArr);
          setPlanName(filteredArr);
     
       })
        .catch((error) => console.log("error", error));
    }

    loadPlanlist();
    loadEquibName();
  }, [open]);

  return (
    <>
      <div className="rounded-md px-2 py-3">
        <button
          onClick={openForm}
          className="flex justify-center items-center font-light bg-violet-600 hover:bg-violet-800 px-3 py-1 rounded-lg text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:bg-gray-400"
          // disabled={status.loading}
          type="button"
        >
          สร้างรายการแผนการจัดซื้อ/จ้าง/เช่า
        </button>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
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
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          เพิ่มข้อมูล
                        </Dialog.Title>
                        <div className="mt-2">
                          <form onSubmit={createRow}>
                            <div className="overflow-hidden  sm:rounded-md">
                              <div className="bg-white px-0 py-5 sm:p-6">
                                <div className="grid grid-cols-12 gap-6">

                                <div className="col-span-4">
                                    <label
                                      htmlFor="first-name"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      ประเภทงาน
                                    </label>
                            
                                    <select
                                      id="job_type"
                                      name="job_type"
                                      required
                                      onChange={setJobType}
                                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                      <option>จัดซื้อ</option>
                                      <option>จัดจ้าง</option>
                                      <option>จัดเช่า</option>
                                    </select>
                                  </div>
                                   

                                  <div  className="col-span-8">
                                  { type =='จัดซื้อ' ? (
                                    <div>
                                    <label
                                      htmlFor="last-name"
                                      className="block w-full text-sm font-medium text-gray-700"
                                    >
                                      กลุ่มอุปกรณ์
                                    </label>
                                  
                                    <select
                                      id="job_type"
                                      name="job_type"
                                      required
                                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                     
                                      {equib.map((item) => (
                                            <option  key={item.equib_name}>{item.equib_name}</option>
                                              ))}
                                    </select>
                                    </div>) : <div></div> }
                                  
                                    { type =='จัดจ้าง' ? (
                                    <div>
                                    <label
                                      htmlFor="last-name"
                                      className="block w-full text-sm font-medium text-gray-700"
                                    >
                                      ประเภทงานจ้าง
                                    </label>
                                    <select
                                      id="job_employment"
                                      name="job_employment"
                                      required
                                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                      <option>จ้างทำสายไฟ</option>
                                      <option>จ้างอื่นๆ</option>
                                    </select>
                                    </div>) : <div></div> }

                                    { type =='จัดเช่า' ? (
                                    <div>
                                    <label
                                      htmlFor="last-name"
                                      className="block w-full text-sm font-medium text-gray-700"
                                    >
                                      ประเภทงานเช่า
                                    </label>
                                    <input
                                      type="text"
                                      id="bid_no"
                                      name="bid_no"
                                      required
                                      className="mt-1 px-3 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    </div>) : <div></div> }

                                  </div>

                                  <div className="col-span-4">
                                    <label
                                      htmlFor="first-name"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      ปีที่ได้รับงบประมาณ
                                    </label>
                            
                                    <select
                                      id="year_budget"
                                      name="year_budget"
                                      required
                                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                      <option>2565</option>
                                      <option>2564</option>
                                      <option>2563</option>
                                      <option>2562</option>
                                    </select>
                                  </div>

                                  <div className="col-span-8">
                                    <label
                                      htmlFor="last-name"
                                      className="block w-full text-sm font-medium text-gray-700"
                                    >
                                      Bid No.
                                    </label>
                                    <input
                                      
                                      type="text"
                                      id="bid_no"
                                      name="bid_no"
                                      required
                                      className="mt-1 px-3 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>

                                  <div className="col-span-12">
                                    <label
                                      htmlFor="email-address"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      รายการแผนจัดซื้อ/จ้าง/เช่า
                                    </label>
                                    <button className='px-4' type="button"  
                                    onClick={
                                      () => console.log("GGGGGG")
                                     // getItemData
                                      } >
                                <FaSistrix/>
                            </button>
                                    <input
                                      type="text"
                                      id="detail_plan"
                                      name="detail_plan"
                                      required
                                      className="mt-1 px-3 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>

                                  <div className="col-span-4">
                                    <label className="block w-full text-sm font-medium text-gray-700"
                                    >
                                      จำนวนรายการ
                                    </label>
                                    <select
                                      id="list_no"
                                      name="list_no"
                                      required
                                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                      <option>6</option>
                                      <option>7</option>
                                    </select>
                                  </div>

                                   {/* <div className="col-span-8">
                                     <label
                                      className="block  text-sm font-medium text-gray-700"
                                    >
                                      สัญญาลงวันที่
                                    </label>
                                    <DatePicker 
                                        inline 
                                        selected={startDate} 
                                        dateFormat="dd/MM/yyyy"
                                        onChange={(date) => setStartDate(date)} />
                                   
                                  </div> */}

                                  <div className="col-span-12">
                                    <label className="block text-sm font-light text-gray-700"
                                    >
                                      <p>หลังจากท่านสร้างรายการแผนการจัดซื้อ/จ้าง/เช่าแล้ว</p>
                                      <p>จะสามารถเพิ่มรายการข้อมูลพัสดุตามจำนวนที่ท่านได้เลือกไว้</p>
                                    </label>
                               
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
                                  สร้างรายการ
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
  );
}
