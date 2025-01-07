import React from "react";
import PillsTab from "../../components/tabs/Tab";
import TabCards from "../../components/tabCards/TabCards";

const OurSpecialities = () => {
  const tabs = [
    {
      label: "Specialities",
      content: (
        <div>
          <TabCards
            img={"/images/tabItem-1.png"}
            title={"Dragon Sushi"}
            description={
              "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus. Donec vitae vulputate nunc, in laoreet urna."
            }
            price={"$50"}
          />

          <TabCards
            img={"/images/tabItem-2.png"}
            title={"Dragon Sushi"}
            description={
              "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus. Donec vitae vulputate nunc, in laoreet urna."
            }
            price={"$50"}
          />

          <TabCards
            img={"/images/tabItem-3.png"}
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
      label: "Home Style Sushi",
      content: (
        <div>
          <TabCards
            img={"/images/tabItem-2.png"}
            title={"Dragon Sushi"}
            description={
              "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus. Donec vitae vulputate nunc, in laoreet urna."
            }
            price={"$50"}
          />

          <TabCards
            img={"/images/tabItem-3.png"}
            title={"Dragon Sushi"}
            description={
              "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus. Donec vitae vulputate nunc, in laoreet urna."
            }
            price={"$50"}
          />

          <TabCards
            img={"/images/tabItem-3.png"}
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
      label: "Steak",
      content: (
        <div>
          <TabCards
            img={"/images/tabItem-3.png"}
            title={"Dragon Sushi"}
            description={
              "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus. Donec vitae vulputate nunc, in laoreet urna."
            }
            price={"$50"}
          />

          <TabCards
            img={"/images/tabItem-1.png"}
            title={"Dragon Sushi"}
            description={
              "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus. Donec vitae vulputate nunc, in laoreet urna."
            }
            price={"$50"}
          />

          <TabCards
            img={"/images/tabItem-2.png"}
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
      label: "Cakes",
      content: (
        <div>
          <TabCards
            img={"/images/tabItem-2.png"}
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
      label: "Cock Tails",
      content: (
        <div>
          <TabCards
            img={"/images/tabItem-2.png"}
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
      label: "Wine",
      content: (
        <div>
          <TabCards
            img={"/images/tabItem-2.png"}
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
        label: "Appetizer",
        content: (
          <div>
            <TabCards
              img={"/images/tabItem-2.png"}
              title={"Dragon Sushi"}
              description={
                "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus. Donec vitae vulputate nunc, in laoreet urna."
              }
              price={"$50"}
            />
            </div>)}
  ];

  const handleTabChange = (index) => {
    console.log(`Active Tab Index: ${index}`);
  };

  return (
    <>
      <section className="our-specialites">
        <div className="section-heading">
          <p className="overline">Quality Food For You</p>
          <h2 className="title">Our Specialities</h2>
          <p className="bottomline w-50 my-3">
            Authentic food from our restaurant served with high quality
            ingredients
          </p>
        </div>

        <div className="specialities-tab my-6">
          <PillsTab tabs={tabs} onTabChange={handleTabChange} />
        </div>
      </section>
    </>
  );
};

export default OurSpecialities;
