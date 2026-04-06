import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  // mock data
  const data = {
    finished_m1: true,
    module1: {
      symptoms: true,
      personalHygiene: true,
      location: false,
    },
    module2: {
      module2part1: false,
      chopping: false,
      cooking: false,
    },
    module3: {
      module3part1: false,
      module3part2: false,
      module3part3: false,
    },
    module4: {
      module4part1: false,
      module4part2: false,
      module4part3: false,
    },
    module5: {
      module5part1: false,
      module5part2: false,
      module5part3: false,
    },
    module6: {
      module6part1: false,
      module6part2: false,
      module6part3: false,
    },
  };

  const routeMap = {
    module1: {
      symptoms: "/module1/symptoms",
      personalHygiene: "/module1/personalHygiene",
      location: "/module1/location",
    },
    module2: {
      module2part1: "/module2/module2part1",
      chopping: "/module2/chopping",
      cooking: "/module2/cooking",
    },
    module3: {
      module3part1: "/module3/module3part1",
      module3part2: "/module3/module3part2",
      module3part3: "/module3/module3part3",
    },
    module4: {
      module4part1: "/module4/module4part1",
      module4part2: "/module4/module4part2",
      module4part3: "/module4/module4part3",
    },
    module5: {
      module5part1: "/module5/module5part1",
      module5part2: "/module5/module5part2",
      module5part3: "/module5/module5part3",
    },
    module6: {
      module6part1: "/module6/module6part1",
      module6part2: "/module6/module6part2",
      module6part3: "/module6/module6part3",
    },
  };

  const modules = [
    { name: "Module 1", key: "module1" },
    { name: "Module 2", key: "module2" },
    { name: "Module 3", key: "module3" },
    { name: "Module 4", key: "module4" },
    { name: "Module 5", key: "module5" },
    { name: "Module 6", key: "module6" },
  ];

  // 🔥 SAME unlock logic
  const getGames = (moduleObj) => {
    const entries = Object.entries(moduleObj || {});
    let lastTrue = -1;

    entries.forEach(([_, val], i) => {
      if (val === true) lastTrue = i;
    });

    return entries.map(([name, val], i) => ({
      name,
      completed: val,
      clickable: val === true || i === lastTrue + 1,
    }));
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "420px",
        backgroundColor: "#f5e6c8",
        border: "5px solid black",
        borderRadius: "20px",
        padding: "20px",
        zIndex: 20,
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Select Module</h2>

      {modules.map((mod, index) => {
        const games = getGames(data[mod.key]);

        return (
          <div key={index} style={{ marginBottom: "10px" }}>
            {/* MODULE HEADER */}
            <div
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              style={{
                backgroundColor: "#e6c89c",
                border: "3px solid black",
                borderRadius: "12px",
                padding: "10px",
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {mod.name}
            </div>

        
            {openIndex === index && (
              <div style={{ marginTop: "5px" }}>
                {games.map((game, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (!game.clickable) return;
                      navigate(routeMap[mod.key][game.name]);
                    }}
                    style={{
                      marginTop: "5px",
                      padding: "8px",
                      border: "2px solid black",
                      borderRadius: "10px",
                      textAlign: "center",
                      backgroundColor: game.clickable
                        ? "#c8f7c5"
                        : "#ccc",
                      cursor: game.clickable
                        ? "pointer"
                        : "not-allowed",
                      opacity: game.clickable ? 1 : 0.6,
                    }}
                  >
                    {game.name} {game.completed && "✔"}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}