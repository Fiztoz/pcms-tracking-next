import React from "react";

/**
 * column filter component
 */
const ColumnFilter = ({ column }) => {
  return (
    <>
    <span>
      {/* ค้นหา:{' '} */}
      <input
        className="w-full px-3 text-sm font-light text-gray-700 bg-gray-50 rounded-[8px]"
        type="text"
        value={column.filterValue || ''}
        onChange={e => column.setFilter(e.target.value)}
      />
    </span>
  </>
  );
};

export default ColumnFilter;
