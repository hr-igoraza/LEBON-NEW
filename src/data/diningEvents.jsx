import React, { useEffect, useState } from "react";
import Tab from "../components/tabs/Tab";
import EventCards from "../components/eventCards/EventCards";
import API from "../utils/api"; // Use your axios instance

const Events = () => { 
  const [events, setEvents] = useState([]);
  

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await API.get("/menu");
        const menuItems = response.data;

        // Group items by category
        const groupedEvents = menuItems.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {});

        // Transform grouped items into an array of tabs
        const transformedEvents = Object.keys(groupedEvents).map((category) => ({
          label: category,
          content: (
            <div>
              {groupedEvents[category].map((item) => (
                <EventCards
                  key={item._id} // Assuming each item has a unique _id
                  img={item.itemImages[0]}
                  title={item.itemName}
                  description={item.description}
                  price={`$${item.price}`}
                />
              ))}
            </div>
          ),
        }));

        setEvents(transformedEvents);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div>
      <Tab tabs={events} />
    </div>
  );
};

export default Events;
