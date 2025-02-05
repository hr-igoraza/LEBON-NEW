import React, { useEffect, useState } from "react";
import Tab from "../components/tabs/Tab";
import TabCards from "../components/tabCards/TabCards";
import API from "../utils/api";

const ProductTab = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get(`api/products?category=${category}`);
        const fetchedProducts = response.data;

        const groupedProducts = fetchedProducts.reduce((acc, item) => {
          const subCategoryName = item.subCategory?.name || "Uncategorized";
          acc[subCategoryName] = acc[subCategoryName] || [];
          acc[subCategoryName].push(item);
          return acc;
        }, {});

        const transformedProducts = Object.keys(groupedProducts).map(
          (subCategory) => ({
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
                  />
                ))}
              </div>
            ),
          })
        );

        setProducts(transformedProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      {loading ? (
        <p>Loading {category}...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : products.length > 0 ? (
        <Tab tabs={products} />
      ) : (
        <p className="text-white text-center">No {category} available.</p>
      )}
    </div>
  );
};

export default ProductTab;
