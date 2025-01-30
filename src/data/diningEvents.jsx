import React, { useEffect, useState } from "react";
import Tab from "../components/tabs/Tab";
import EventCards from "../components/eventCards/EventCards";
import API from "../utils/api"; // Assuming this is your axios instance

const Events = ({ category }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get(`api/products?category=${category}`); // Using the category prop in the API call
        const eventItems = response.data;
        console.log(eventItems);

        // Group events by subcategory (or use 'Uncategorized' as fallback)
        const groupedEvents = eventItems.reduce((acc, event) => {
          const subCategory = event.subCategory?.name || "Uncategorized"; // Handle missing subcategories
          acc[subCategory] = acc[subCategory] || [];
          acc[subCategory].push(event);
          return acc;
        }, {});

        // Transform grouped events into tabs
        const transformedEvents = Object.keys(groupedEvents).map((subCategory) => ({
          label: subCategory,
          content: (
            <div className="event-list">
              {groupedEvents[subCategory].map((event) => (
                <EventCards
                  key={event._id}
                  img={event.images?.[0] || "/placeholder.jpg"}
                  title={event.name}
                  description={event.description}
                  price={`$${event.price}`}
                />
              ))}
            </div>
          ),
        }));

        setEvents(transformedEvents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]); // The effect will run again if the category changes

  return (
    <div>
      {loading ? (
        <p>Loading {category} events...</p>
      ) : error ? (
        <p className="error-message text-white text-center">{error}</p>
      ) : events.length > 0 ? (
        <Tab tabs={events} />
      ) : (
        <p className="text-center text-white">No {category} events available.</p>
      )}
    </div>
  );
};

export default Events;
