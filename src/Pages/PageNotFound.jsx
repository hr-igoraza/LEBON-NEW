import React from "react";
import NavBar from "../components/navBar/NavBar";

const PageNotFound = () => {
  return (
    <>
      <NavBar />
      <div className="404" style={{ margin: '200px auto', textAlign: 'center' }}>
        <h1 className="f-1 f-col-y">Page Not Found</h1>
      </div>
    </>
  );
  
};

export default PageNotFound;
