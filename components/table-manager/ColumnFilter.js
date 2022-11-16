/**
 * column filter component
 */
const ColumnFilter = ({ column }) => {
  return (
    <>
    <span>
      {/* ค้นหา:{' '} */}
      <input
        type="text"
        value={column.filterValue || ''}
        onChange={e => column.setFilter(e.target.value)}
      />
    </span>
  </>
  );
};

export default ColumnFilter;
