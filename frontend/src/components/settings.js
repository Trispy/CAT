import gearicon from "../assets/settings.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Settings({ openMenu }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  // Open global menu overlay
  const handleMenu = () => {
    if (openMenu) openMenu();
    setOpen(false);
  };

  // Navigate to map
  const handleMap = () => {
    setOpen(false);
    navigate("/map");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/login");
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      {/* Gear Icon */}
      <img
        src={gearicon}
        alt="settings"
        onClick={toggleMenu}
        style={{
          width: "30px",
          height: "30px",
          cursor: "pointer",
        }}
      />

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "0",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            padding: "8px",
            minWidth: "120px",
            zIndex: 1000,
          }}
        >
          <button
            onClick={handleMenu}
            style={buttonStyle}
          >
            Menu
          </button>

          <button
            onClick={handleMap}
            style={buttonStyle}
          >
            Map
          </button>

          <button
            onClick={handleLogout}
            style={buttonStyle}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

// reusable style
const buttonStyle = {
  background: "none",
  border: "none",
  fontSize: "12px",
  color: "black",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
  padding: "8px",
};