import React, { useState, useEffect } from "react";
import API from "../../utils/api";

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");
    setImagePreviews([]);
    setImages(" ");

    // Form validation
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

    // Prepare form data
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

      // Reset form fields
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
      // Handle error
      setMessage(
        typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : JSON.stringify(error.response?.data || "Error adding product.")
      );
      
      setMessageType("error");
      setLoading(false);
    }
  };

  // Handle adding a new category
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

      // Update the categories list
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle adding a new subcategory
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

      // Immediately filter the subcategories to include the new one
      filterSubCategories();
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  return (
    <>
    <div className="container">
      <div className="text-white">
        <h2>Add Product</h2>
        <p>Here you can add a new product to the inventory.</p>

        {/* Display message */}
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
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

          {/* Description */}
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

          {/* Price */}
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

          {/* Category Dropdown */}
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
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={handleAddCategory}
                disabled={loading}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Subcategory Dropdown */}
          <div className="mb-3">
            <label htmlFor="subCategory" className="form-label">
              Subcategory
            </label>
            <div className="d-flex">
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
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={handleAddSubCategory}
                disabled={!category || loading}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Veg/Non-Veg */}
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

          {/* Is Deliverable */}
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

          {/* Images */}
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
            {/* Image Previews */}
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
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