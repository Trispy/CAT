import React from "react";
import textboxImage from "../assets/TextBox.png";

function Textbox({ 
  width, 
  height, 
  placeholder, 
  placeHolderColor, 
  placeHolderfontSize 

}) 


{
  return (
    <div
      style={{
        width,
        height,
        backgroundImage: `url(${textboxImage})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "70%",   
          height: "70%",  
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: placeHolderColor || "black",
          fontSize: placeHolderfontSize || "30px",
          fontWeight: "bold",
          overflow: "hidden",
        }}
      >
        {placeholder}
      </div>
    </div>
  );
}

export default Textbox;
