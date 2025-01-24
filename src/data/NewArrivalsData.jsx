import React, { useEffect, useState } from "react";
import Tab from "../components/tabs/Tab";
import TabCards from "../components/tabCards/TabCards";
import API from "../utils/api"; // Axios instance for API requests

const NewArrivalTab = () => {
  const [newArrival, setNewArrival] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewArrival = async () => {
      try {
        const response = await API.get("/new-arrivals/"); 
        const fetchedNewArrival = response.data;

        const groupedNewArrival = fetchedNewArrival.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {});

        const transformedNewArrival = Object.keys(groupedNewArrival).map((category) => ({
          label: category,
          content: (
            <div className="cake-list">
              {groupedNewArrival[category].map((cake) => (
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

        setNewArrival(transformedNewArrival);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching newArrival:", err);
        setError("Failed to load newArrival. Please try again later.");
        setLoading(false);
      }
    };

    fetchNewArrival();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading newArrival...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : newArrival.length > 0 ? (
        <Tab tabs={newArrival} />
      ) : (
        <p className="text-white  text-center">No newArrival available.</p>
      )}
    </div>
  );
};

export default NewArrivalTab;
