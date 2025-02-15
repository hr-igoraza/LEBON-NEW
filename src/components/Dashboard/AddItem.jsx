import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import "./viewItem.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [isVeg, setIsVeg] = useState(false);
  const [isDeliverable, setIsDeliverable] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, [categories]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (category) {
      fetchSubCategories();
    } else {
      setSubCategories([]);
    }
  }, [category]);

  useEffect(() => {
    filterSubCategories();
  }, [category, subCategories]);

  const filterSubCategories = () => {
    if (category && Array.isArray(subCategories)) {
      const filtered = subCategories.filter(
        (subCat) => subCat.category === category
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await API.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await API.get(`/api/categories/${category}`);
      setSubCategories(response.data.subCategories);
    } catch (error) {
      setSubCategories([]);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubCategory("");
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const validFiles = Array.from(files).filter((file) => {
        if (!file.type.startsWith("image/")) {
          setMessage("Only image files are allowed.");
          setMessageType("error");
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          setMessage("File size must be less than 5MB.");
          setMessageType("error");
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        setImages(validFiles);
        const previews = validFiles.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
      } else {
        setImages([]);
        setImagePreviews([]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");
    setImagePreviews([]);
    setImages(" ");

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      images.length === 0
    ) {
      setMessage("Please fill in all fields and upload at least one image.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (price <= 0) {
      setMessage("Price must be a positive number.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("isVeg", isVeg);
    formData.append("isDeliverable", isDeliverable);

    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await API.post("api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setMessage("Product added successfully!");
      setMessageType("success");
      setLoading(false);

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setSubCategory("");
      setIsVeg(false);
      setIsDeliverable(false);
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      setMessage(
        typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : JSON.stringify(error.response?.data || "Error adding product.")
      );
      setMessageType("error");
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    const categoryName = prompt("Enter the name of the new category:");
    if (!categoryName) {
      alert("Category name cannot be empty.");
      return;
    }

    try {
      const response = await API.post(
        "/api/categories",
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCategories([...categories, response.data]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleAddSubCategory = async () => {
    if (!category) {
      alert("Please select a category first.");
      return;
    }

    const subCategoryName = prompt("Enter the name of the new subcategory:");
    if (!subCategoryName) {
      alert("Subcategory name cannot be empty.");
      return;
    }

    try {
      const response = await API.post(
        "/api/subcategories/",
        { name: subCategoryName, categoryId: category },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchSubCategories();
      setSubCategories([...subCategories, response.data]);
      setSubCategory(response.data._id);

      filterSubCategories();
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

//   edit a subcategory
  const handleEditSubCategory = async (subCategoryId) => {
    const subCategoryToEdit = filteredSubCategories.find(
      (subCat) => subCat._id === subCategoryId
    );
    if (!subCategoryToEdit) {
      alert("Subcategory not found.");
      return;
    }

    const newName = prompt(
      "Enter the new name for the subcategory:",
      subCategoryToEdit.name
    );
    if (!newName) {
      alert("Subcategory name cannot be empty.");
      return;
    }

    try {
      const response = await API.put(
        `/api/subcategories/${subCategoryId}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // update subcategories list
      const updatedSubCategories = subCategories.map((subCat) =>
        subCat._id === subCategoryId ? { ...subCat, name: newName } : subCat
      );
      setSubCategories(updatedSubCategories);
      filterSubCategories();
    } catch (error) {
      console.error("Error editing subcategory:", error);
    }
  };

  // to delete a subcategory
  const handleDeleteSubCategory = async (subCategoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subcategory?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/api/subcategories/${subCategoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

   
      const updatedSubCategories = subCategories.filter(
        (subCat) => subCat._id !== subCategoryId
      );
      setSubCategories(updatedSubCategories);
      filterSubCategories();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="text-white">
          <h2>Add Product</h2>
          <p>Here you can add a new product to the inventory.</p>

          {message && (
            <div
              className={`alert ${
                messageType === "success" ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control bg-dark text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-control bg-dark text-white"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                id="price"
                className="form-control bg-dark text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                disabled={loading}
                min="0"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <div className="d-flex">
                <select
                  id="category"
                  className="form-control bg-dark text-white me-2"
                  value={category}
                  onChange={handleCategoryChange}
                  required
                  disabled={loading}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ==================== */}

            <div className="mb-3">
              <label htmlFor="subCategory" className="form-label">
                Subcategory
              </label>
              <div className="d-flex">
                {/* Subcategory Dropdown */}
                <select
                  id="subCategory"
                  className="form-control bg-dark text-white me-2"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                  disabled={!category || loading}
                >
                  <option value="">Select Subcategory</option>
                  {filteredSubCategories.map((subCat) => (
                    <option key={subCat._id} value={subCat._id}>
                      {subCat.name}
                    </option>
                  ))}
                </select>

                {/* Add Subcategory Button */}
                <button
                  type="button"
                  className="btn btn-outline-light me-2"
                  onClick={handleAddSubCategory}
                  disabled={!category || loading}
                >
                  + Add
                </button>

                {/* Manage Subcategories Button */}
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => setIsModalOpen(true)}
                  disabled={!category || loading}
                >
                  Manage Subcategories
                </button>
              </div>

              {/* Modal for Subcategory Management */}
              {isModalOpen && (
                <div
                  className="modal"
                  style={{
                    display: "block",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header gap-3">
                        <h5 className="modal-title">Manage Subcategories</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setIsModalOpen(false)}
                        ></button>
                      </div>
                      <div className="modal-body ">
                        {filteredSubCategories.map((subCat) => (
                          <div
                            key={subCat._id}
                            className="d-flex align-items-center mb-2 "
                          >
                            <div className="w-300px     ">
                              <span>{subCat.name}</span>
                            </div>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-warning ms-2"
                                onClick={() =>
                                  handleEditSubCategory(subCat._id)
                                }
                                disabled={loading}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={() =>
                                  handleDeleteSubCategory(subCat._id)
                                }
                                disabled={loading}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ================= */}

            <div className="mb-3">
              <label htmlFor="isVeg" className="form-label">
                Veg/Non-Veg
              </label>
              <select
                id="isVeg"
                className="form-control bg-dark text-white"
                value={isVeg}
                onChange={(e) => setIsVeg(e.target.value === "true")}
                required
                disabled={loading}
              >
                <option value={true}>Veg</option>
                <option value={false}>Non-Veg</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="isDeliverable" className="form-label">
                Is Delivery Available?
              </label>
              <select
                id="isDeliverable"
                className="form-control bg-dark text-white"
                value={isDeliverable}
                onChange={(e) => setIsDeliverable(e.target.value === "true")}
                required
                disabled={loading}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="images" className="form-label">
                Product Images
              </label>
              <input
                type="file"
                id="images"
                className="form-control bg-dark text-white"
                multiple
                onChange={handleImageChange}
                required
                disabled={loading}
              />
              {imagePreviews.length > 0 && (
                <div className="mt-2 d-flex flex-wrap gap-2">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="img-thumbnail"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Adding Product...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
