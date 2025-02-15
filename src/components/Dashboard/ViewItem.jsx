import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./viewItem.css";
import ItemTable from "./ViewItemComponents/ItemTable";
import Pagination from "./ViewItemComponents/Pagination";
import EditItemModal from "./ViewItemComponents/EditModal";
import CategoryFilter from "./ViewItemComponents/CatagoryFilter";

const ViewItem = ({ setActiveTab }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");
  const [modalFeedback, setModalFeedback] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchItems = async ({ queryKey }) => {
    const [, page, limit, category] = queryKey;
    const response = await API.get(
      `/api/products?page=${page}&limit=${limit}&category=${category}`
    );
    return response.data;
  };

  const fetchCategories = async () => {
    const response = await API.get("/api/categories");
    return response.data;
  };

  const fetchSubcategories = async (categoryId) => {
    const response = await API.get(`/api/categories/${categoryId}`);
    return response.data.subCategories || [];
  };

  const {
    data: itemsData,
    isLoading: itemsLoading,
    error: itemsError,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["items", currentPage, itemsPerPage, selectedCategory],
    queryFn: fetchItems,
    keepPreviousData: true,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: subcategoriesData, refetch: refetchSubcategories } = useQuery({
    queryKey: ["subcategories", currentItem?.category],
    queryFn: () => fetchSubcategories(currentItem?.category),
    enabled: !!currentItem?.category,
  });

  const deleteItemMutation = useMutation({
    mutationFn: (id) => API.delete(`/api/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items", currentPage, itemsPerPage, selectedCategory],
      });
      setFeedback("Item deleted successfully.");
    },
    onError: (err) => {
      setFeedback(
        err.response?.data?.message ||
          "Failed to delete item. Please try again."
      );
    },
    onSettled: () => {
      setTimeout(() => setFeedback(""), 3000);
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: (formData) =>
      API.put(`/api/products/${currentItem._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["items", currentPage, itemsPerPage, selectedCategory],
      });
      setModalFeedback("Item updated successfully.");
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    },
    onError: (err) => {
      setModalFeedback(
        err.response?.data?.message ||
          "Failed to update item. Please try again."
      );
    },
  });

  const handleCategoryFilterChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        deleteItemMutation.mutate(id);
      }
    },
    [deleteItemMutation]
  );

  const handleEdit = useCallback((item) => {
    setCurrentItem({
      ...item,
      category: item.category?._id,
      subCategory: item.subCategory?._id,
    });
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (updateItemMutation.isLoading) return; // Prevent multiple submissions

    if (
      !currentItem?.name ||
      !currentItem?.price ||
      !currentItem?.category ||
      !currentItem?.description
    ) {
      setModalFeedback("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", currentItem.name);
    formData.append("description", currentItem.description);
    formData.append("price", currentItem.price);
    formData.append("isVeg", currentItem.isVeg);
    formData.append("isDeliverable", currentItem.isDeliverable);
    formData.append("category", currentItem.category);
    formData.append("subCategory", currentItem.subCategory);

    if (currentItem.newImages) {
      currentItem.newImages.forEach((file) => {
        formData.append("images", file);
      });
    }

    updateItemMutation.mutate(formData);
  }, [currentItem, updateItemMutation]);

  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    setCurrentItem((prevItem) => ({
      ...prevItem,
      newImages: files,
    }));
  }, []);

  const handleCategoryChange = useCallback(
    async (categoryId) => {
      setCurrentItem((prev) => ({ ...prev, subCategory: "" }));
      refetchSubcategories();
    },
    [refetchSubcategories]
  );

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setModalFeedback("");
  }, []);

  const filteredItems = useMemo(() => {
    return selectedCategory
      ? itemsData?.products?.filter(
          (item) => item.category?.name === selectedCategory
        ) || []
      : itemsData?.products || [];
  }, [itemsData, selectedCategory]);

  return (
    <>
      <div className="wrapper">
        <div className="text-white">
          <h2>Menu Items</h2>
          <p>Here you can view all the items.</p>

          <CategoryFilter
            categories={categoriesData || []}
            selectedCategory={selectedCategory}
            onChange={handleCategoryFilterChange}
          />

          {itemsLoading && <p>Loading items...</p>}
          {itemsError && (
            <div>
              <p className="text-danger">{itemsError.message}</p>
              <button className="btn btn-primary" onClick={refetchItems}>
                Retry
              </button>
            </div>
          )}
          {feedback && <p className="text-success">{feedback}</p>}

          {!itemsLoading && itemsData?.products?.length === 0 && (
            <p>No items available.</p>
          )}

          {!itemsLoading && itemsData?.products?.length > 0 && (
            <ItemTable
              items={filteredItems}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={itemsData?.totalPages || 1}
            handlePageChange={handlePageChange}
          />
        </div>

        <EditItemModal
          isModalOpen={isModalOpen}
          currentItem={currentItem}
          categories={categoriesData || []}
          subcategories={subcategoriesData || []}
          handleCategoryChange={handleCategoryChange}
          handleImageUpload={handleImageUpload}
          handleSave={handleSave}
          handleCloseModal={handleCloseModal}
          isSaving={updateItemMutation.isLoading}
          modalFeedback={modalFeedback}
          setCurrentItem={setCurrentItem}
        />
      </div>
    </>
  );
};

export default ViewItem;