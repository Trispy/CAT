import React from "react";
import textboxImage from "../assets/erintextbox.png";

function TextboxErin({ 
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
        padding: "2% 6%",   
      }}
    >
      <div
        style={{
          width: "100%",
          paddingLeft: "33%",  
          paddingRight: "5%", 
          paddingBottom: "5%",
          textAlign: "center",
          color: placeHolderColor || "black",
          fontSize: placeHolderfontSize || "30px",
          fontWeight: "bold",
          lineHeight: "1.4",
        }}
      >
        {placeholder}
      </div>
    </div>
  );
}

export default TextboxErin;
