function CategoryFilter({ category, setCategory }) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      <option value="Wallet">Wallet</option>
      <option value="Phone">Phone</option>
      <option value="Bottle">Bottle</option>
      <option value="ID Card">ID Card</option>
      <option value="Keys">Keys</option>
      <option value="Others">Others</option>
    </select>
  );
}

export default CategoryFilter;
