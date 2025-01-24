import React, { useEffect, useState } from "react";
import Tab from "../components/tabs/Tab";
import TabCards from "../components/tabCards/TabCards";
import API from "../utils/api"; // Axios instance for API requests

const TodaysSpecialTab = () => {
  const [todaysSpecial, setTodaysSpecial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodaysSpecial = async () => {
      try {
        const response = await API.get("/todays-special/"); 
        const fetchedTodaysSpecial = response.data;

        const groupedTodaysSpecial = fetchedTodaysSpecial.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {});

        const transformedTodaysSpecial = Object.keys(groupedTodaysSpecial).map((category) => ({
          label: category,
          content: (
            <div className="cake-list">
              {groupedTodaysSpecial[category].map((cake) => (
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

        setTodaysSpecial(transformedTodaysSpecial);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching todaysSpecial:", err);
        setError("Failed to load todaysSpecial. Please try again later.");
        setLoading(false);
      }
    };

    fetchTodaysSpecial();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading todaysSpecial...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : todaysSpecial.length > 0 ? (
        <Tab tabs={todaysSpecial} />
      ) : (
        <p>No todaysSpecial available.</p>
      )}
    </div>
  );
};

export default TodaysSpecialTab;
