/**
 * column filter component
 */
const ColumnFilter = ({ column }) => {
  return (
    <>
    <span>
      {/* ค้นหา:{' '} */}
      <input
        className="w-full text-sm font-light text-gray-700 bg-gray-50 rounded-lg  focus:ring-violet-500"
        type="text"
        value={column.filterValue || ''}
        onChange={e => column.setFilter(e.target.value)}
      />
    </span>
  </>
  );
};

export default ColumnFilter;
