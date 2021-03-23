import React from "react";
import "./ElementHtml01.sass";
import "./ElementHtmlAll.sass";

function ElementHtml01() {
  return (
    <div>
      <div className="element-html-container">
        <div className="element-html">
          <div id="empty"></div>
          <div className="body-text no-selection">
            {" "}
            <p>[HTML content.]</p>
            <p>
              A Fox is a quick (0 to 50 in 10 seconds). It's surefooted
              (front-wheel drive). This sly, cunnng sedan can take the sharpest
              turns nimbly (sports car type steering and suspension).
            </p>
            <p>Best of all, for under $3,400 you can catch the Fox.</p>
          </div>
          <div className="header-audi no-selection">
            <h1>
              Your hunt is over. <br />
              The quick, sly, crafty,
            </h1>
          </div>
          <div className="header-audi">
            <h1 className="no-selection">cunning fox by Audi is here.</h1>
            <button className="audi">Discover more</button>
          </div>
          <div className="disclaimer no-selection">
            {" "}
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              a eros eget diam dapibus placerat. Suspendisse interdum. Praesent
              a eros eget diam dapibus placerat. Suspendisse.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElementHtml01;
