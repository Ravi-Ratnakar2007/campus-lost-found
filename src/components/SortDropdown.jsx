function SortDropdown({ sortOrder, setSortOrder }) {
  return (
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
    </select>
  );
}

export default SortDropdown;
