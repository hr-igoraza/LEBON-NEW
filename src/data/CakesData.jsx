import React, { useEffect, useState } from "react";
import Tab from "../components/tabs/Tab";
import TabCards from "../components/tabCards/TabCards";
import API from "../utils/api"; // Axios instance for API requests

const CakesTab = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await API.get("/cakes/"); 
        const fetchedCakes = response.data;

        const groupedCakes = fetchedCakes.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {});

        const transformedCakes = Object.keys(groupedCakes).map((category) => ({
          label: category,
          content: (
            <div className="cake-list">
              {groupedCakes[category].map((cake) => (
                <TabCards
                  key={cake._id} 
                  title={cake.itemName}
                  img={cake.itemImages?.[0] || "/placeholder.jpg"} 
                  description={cake.description}
                  price={`$${cake.price}`}
                />
              ))}
            </div>
          ),
        }));

        setCakes(transformedCakes);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cakes:", err);
        setError("Failed to load cakes. Please try again later.");
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading cakes...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : cakes.length > 0 ? (
        <Tab tabs={cakes} />
      ) : (
        <p>No cakes available.</p>
      )}
    </div>
  );
};

export default CakesTab;
