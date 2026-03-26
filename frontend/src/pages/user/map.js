import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import map from "../../assets/map.png";
import "./map.css";


function Map() {
    const [m1, setm1] = useState(sessionStorage.getItem("m1"));
    const [m2, setm2] = useState(sessionStorage.getItem("m2"));

    const navigate = useNavigate();

    const goToModule1 = () => {
        navigate("/module1/symptoms");
    };
    const goToModule2 = () => {
        navigate("/module2/therm");
    }

    const createClickIndicator = (modulename) => {
        return (
            <div className="indicator">
                <div className="text">{modulename}</div>
                <div className="circle"></div>

            </div>
        );
    };

    return (
        <div className="map-container">
            <img src={map} alt="map" className="map-image" />
            {/* Module 1 clickable area */}
            {(!m1) && (
                <div className="module1" onClick={goToModule1}>
                    {createClickIndicator("")}
                </div>
            )}
            {m1 && (!m2) && (
                <div className="module2" onClick={goToModule2}>
                    {createClickIndicator("")}
                </div>
            )}
        </div>
    );
}

export default Map;