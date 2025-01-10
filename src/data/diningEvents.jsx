import EventCards from "../components/eventCards/EventCards";

export const events = [
  {
    label: "Private Events",
    content: (
      <div>
        <EventCards
          img={"/images/diningEvents-1.png"}
          title={"Dragon Sushi"}
          description={
            "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus. Donec vitae vulputate nunc, in laoreet urna."
          }
          price={"$50"}
        />
      </div>
    ),
  },
  {
    label: "Corporate Events",
    content: (
      <div>
        <EventCards
          linerGradient={"linear-gradient"}
          img={"/images/diningEvents-2.png"}
          title={"Dragon Sushi"}
          description={
            "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus. Donec vitae vulputate nunc, in laoreet urna."
          }
          price={"$50"}
        />

        
      </div>
    ),
  },
];
