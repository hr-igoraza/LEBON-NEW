import React, { memo, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Tab from "../components/tabs/Tab";
import TabCards from "../components/tabCards/TabCards";
import API from "../utils/api";

const getCachedData = (key) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    if (Date.now() - timestamp < 1000 * 60 * 5) {
      return data;
    }
  }
  return null;
};

const setCachedData = (key, data) => {
  const cacheItem = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(cacheItem));
};

const ProductTab = memo(({ category }) => {
  const [page, setPage] = useState(1); // State for pagination
  const limit = 500; 
  // Number of products per page

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", category, page, limit],
    queryFn: async () => {
      // Check if data is available in localStorage
      const cacheKey = `products-${category}-${page}-${limit}`;
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      // If not, fetch from API
      const response = await API.get(
        `api/products?category=${category}&page=${page}&limit=${limit}`
      );
      const data = response.data;

      // Save the fetched data to localStorage
      setCachedData(cacheKey, data);

      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const products = response?.products || [];

  const tabs = useMemo(() => {
    if (!products || products.length === 0) return [];

    const groupedProducts = products.reduce((acc, item) => {
      const subCategoryName = item.subCategory?.name || "Uncategorized";
      acc[subCategoryName] = acc[subCategoryName] || [];
      acc[subCategoryName].push(item);
      return acc;
    }, {});

    // Transform grouped products into the required format
    return Object.keys(groupedProducts).map((subCategory) => ({
      label: subCategory,
      content: (
        <div className="product-list">
          {groupedProducts[subCategory].map((product) => (
            <TabCards
              key={product._id}
              title={product.name}
              img={product.images?.[0] || "/placeholder.jpg"}
              description={product.description}
              price={`₹${product.price}`}
              id={product._id}
              isVeg={product.isVeg}
              isDeliverable={product.isDeliverable}
              category={product.category.name}
            />
          ))}
        </div>
      ),
    }));
  }, [products]);

  // Loading state
  if (isLoading) {
    return <p>Loading {category}...</p>;
  }

  // Error state
  if (isError) {
    return <p className="error-message">{error.message}</p>;
  }

  // No products available
  if (!tabs || tabs.length === 0) {
    return <p className="text-white text-center">No {category} available.</p>;
  }

  return (
    <div>
      {/* Render the tabs */}
      <Tab tabs={tabs} />

      {/* Pagination controls */}
      {response?.totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center pagination my-5">
          <button
            className="btn nav-btn btn-outline-primary mx-2"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="mx-2 text-white">
            Page {page} of {response.totalPages}
          </span>
          <button
            className="btn nav-btn btn-outline-primary mx-2"
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, response.totalPages))
            }
            disabled={page === response.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
});

export default ProductTab;
