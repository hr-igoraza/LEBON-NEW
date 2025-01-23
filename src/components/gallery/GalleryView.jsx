import React from "react";

const GalleryView = () => {
  return (
    <div>
      <h3>Gallery Items</h3>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Item 1</td>
            <td>
              <button
                onClick={() => {
                  // Switch to the edit tab when the edit icon is clicked
                  setActiveTab("edit");
                }}
              >
                Edit
              </button>
            </td>
          </tr>
          <tr>
            <td>Item 2</td>
            <td>
              <button
                onClick={() => {
                  setActiveTab("edit");
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GalleryView;
