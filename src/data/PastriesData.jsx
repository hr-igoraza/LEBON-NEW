import React, { useEffect, useState } from "react";
import Tab from "../components/tabs/Tab";
import TabCards from "../components/tabCards/TabCards";
import API from "../utils/api"; // Axios instance for API requests

const PastriesTab = () => {
  const [pastries, setPastries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPastries = async () => {
      try {
        const response = await API.get("/pastries/"); 
        const fetchedPastries = response.data;

        const groupedPastries = fetchedPastries.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {});

        const transformedPastries = Object.keys(groupedPastries).map((category) => ({
          label: category,
          content: (
            <div className="cake-list">
              {groupedPastries[category].map((cake) => (
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

        setPastries(transformedPastries);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching pastries:", err);
        setError("Failed to load pastries. Please try again later.");
        setLoading(false);
      }
    };

    fetchPastries();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading pastries...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : pastries.length > 0 ? (
        <Tab tabs={pastries} />
      ) : (
        <p className="text-white">No pastries available.</p>
      )}
    </div>
  );
};

export default PastriesTab;
