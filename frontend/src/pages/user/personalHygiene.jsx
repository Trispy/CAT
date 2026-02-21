import React from "react";
import "./login.css";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import background from '../../assets/Background1.png';
import Textbox from "../../components/textbox";

function PersonalHygiene() {
    const backgroundStyle = {
        backgroundImage: `url(${background})`, 
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };
  return (
    <div
      className="form"
      style={backgroundStyle}
    >
    <div className="textbox-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
    <Textbox width="1500px" height="1000px" placeholder="In the following game, we will be going through personal hygiene steps that are essential to do before volunteering. Progress in the game by dragging items to the correct area using your finger." placeHolderColor="#000000" placeHolderfontSize="40px" />
    </div>
      
    </div>
  );
}

export default PersonalHygiene;
