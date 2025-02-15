import React, { memo } from "react";

const CategoryFilter = memo(({ categories, selectedCategory, onChange }) => (
  <div className="mb-3">
    <label>Filter by Category:</label>
    <select
      className="form-control bg-dark text-white my-4"
      value={selectedCategory}
      onChange={onChange}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category._id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  </div>
));

export default CategoryFilter;