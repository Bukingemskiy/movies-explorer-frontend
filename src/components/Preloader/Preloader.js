import React from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader preloader__invisible">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
