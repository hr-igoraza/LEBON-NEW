import React, { useEffect, useState } from "react";
import Tab from "../components/tabs/Tab";
import EventCards from "../components/eventCards/EventCards";
import API from "../utils/api"; // Use your axios instance

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch and transform menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await API.get("/menu");
        const menuItems = response.data;

        // Group items by category
        const groupedEvents = menuItems.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {});

        // Transform grouped items into tab structure
        const transformedEvents = Object.keys(groupedEvents).map(
          (category) => ({
            label: category,
            content: (
              <div className="event-list">
                {groupedEvents[category].map((item) => (
                  <EventCards
                    key={item._id} // Assuming each item has a unique _id
                    img={item.itemImages?.[0] || "/placeholder.jpg"} // Fallback image
                    title={item.itemName}
                    description={item.description}
                    price={`$${item.price}`}
                  />
                ))}
              </div>
            ),
          })
        );

        setEvents(transformedEvents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : events.length > 0 ? (
        <Tab tabs={events} />
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default Events;
