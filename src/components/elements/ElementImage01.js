import React from "react";
import "./ElementImage.sass";
import Image01 from "./../../assets/images/img01.jpg";

function ElementImage01() {
  return (
    <div className="element-img-container">
      <img alt="by Andy Wallace on November 1, 2020." src={Image01} />
    </div>
  );
}

export default ElementImage01;
