/**
 * global filter component with useAsyncDebounce
 */

import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import { useAsyncDebounce } from 'react-table';

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce(value1 => {
    setFilter(value1 || undefined);
  }, 1000);

  return (
    <>
    <span className='px-5'>
      ค้นหาทั้งตาราง:{' '}
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="text"
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>

    
    </>
  );
};

export default GlobalFilter;

/**
 * global filter component
 */
// const GlobalFilter = ({ filter, setFilter }) => {
//   return (
//     <span>
//       Search:{' '}
//       <input
//         type="text"
//         value={filter || ''}
//         onChange={e => {
//           setFilter(e.target.value);
//         }}
//       />
//     </span>
//   );
// };
