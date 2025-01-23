import React from "react";

const GalleryEdit = () => {
  return (
    <div>
      <h3>Edit Gallery Item</h3>
      <form>
        <div>
          <label>Item Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Item Description</label>
          <input type="text" />
        </div>
        {/* Add fields for image, description, etc. */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default GalleryEdit;
