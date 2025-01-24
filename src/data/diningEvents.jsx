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

        const transformedEvents = menuItems.map((item) => ({
          label: item.category,
          content: (
            <div>
              
              <EventCards
                img={item.itemImages[0]}
                title={item.itemName}
                description={item.description}
                price={`$${item.price}`}
              />
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
