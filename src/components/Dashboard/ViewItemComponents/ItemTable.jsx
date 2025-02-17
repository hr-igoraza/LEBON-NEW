import React from "react";

const ItemTable = ({ items, handleEdit, handleDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Deliverable</th>
            <th>Veg/Non-Veg</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>₹{item.price}</td>
              <td>{item.category?.name}</td>
              <td>{item.isDeliverable ? "Yes" : "No"}</td>
              <td>
              
                {item.isVeg == "null"
                  ? "Both Are Available"
                  : (item.isVeg
                  ? "Veg"
                  : "Non-Veg")}
              </td>

              <td>
                <button
                  className="btn btn-primary btn-sm ms-2 mt-2 text-dark"
                  onClick={() => handleEdit(item)}
                  data-bs-toggle="modal"
                  data-bs-target="#editItemModal"
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2 mt-2 "
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
