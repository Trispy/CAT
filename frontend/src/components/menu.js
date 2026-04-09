import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;


export default function Menu({ closeMenu }) {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [summary, setSummary] = useState(null);
  useEffect(() => {
          const token = localStorage.getItem("token");
  
          fetch(`${API}/api/game/moduleSummary`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
              .then(res => {
                  if (!res.ok) throw new Error("Auth failed");
                  return res.json();
              })
              .then(data => setSummary(data))
              .catch(err => console.error("FETCH ERROR:", err));
      }, []);
  // mock data
 console.log("SUMMARY:", summary);

  const routeMap = {
    module1: {
      symptoms: "/module1/symptoms",
      personalHygiene: "/module1/personalHygiene",
      location: "/module1/onLocation",
    },
    module2: {
      module2part1: "/module2/therm",
      chopping: "/module2/cleaning",
      cooking: "/module2/cooking",
    },
    module3: {
      cansort: "/module3/canSorting",
      expiration: "/module3/expiration",
      allergenIdentification: "/module3/allergenIdentification",
    },
    module4: {
      cleanTote: "/module4/cleanTote",
      sorting: "/module4/sorting",
      packing: "/module4/packing",
    },
    module5: {
      coldPreparedTransport: "/module5/coldPreparedTransport",
      hotPreparedTransport: "/module5/hotPreparedTransport",
    },
    module6: {
      serviceSetup: "/module6/foodServiceSetup",
      foodServiceMishaps: "/module6/foodServiceMishaps",
      
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

  const nameMap = {
  module2part1: "module2part1",
  module3part1: "cansort",
  module3part2: "expiration",
  module3part3: "allergenIdentification",
  module4part1: "cleanTote",
  cold: "coldPreparedTransport",
  hot: "hotPreparedTransport",
  module6part1: "serviceSetup",
  module6part2: "foodServiceMishaps",
};
 const getGames = (moduleObj) => {
      if (!summary) return [];

      const allEntries = [];

      const modules = [
      summary.module1,
      summary.module2,
      summary.module3,
      summary.module4,
      summary.module5,
      summary.module6
      ];

      for (let m of modules) {
      if (!m || typeof m !== "object") continue;

      for (let key in m) {
        if (key === "_id" || key === "username" || key === "__v") continue;
        allEntries.push([key, m[key]]);
      }

      }

      let lastTrue = -1;

      allEntries.forEach(([_, val], i) => {
      if (val === true) lastTrue = i;
      });

      const nextIndex = lastTrue === -1 ? 0 : lastTrue + 1;
      const m1Done = summary?.finished_m1 === true;
      const m2Done = summary?.finished_m2 === true;
      const unlockNextModules = m1Done && m2Done;
      const moduleEntries = Object.entries(moduleObj || {})
  .filter(([key]) => key !== "_id" && key !== "username" && key !== "__v");

      return moduleEntries.map(([rawName, val], index) => {
        const name = nameMap[rawName] || rawName;

        const globalIndex = allEntries.findIndex((entry) => {
          const mapped = nameMap[entry[0]] || entry[0];
          return mapped === name;
        });

        let clickable = val === true || globalIndex === nextIndex;


        const m1Done = summary?.finished_m1 === true;
        const m2Done = summary?.finished_m2 === true;
        const unlockModules = m1Done && m2Done;

        const isFirstGame = index === 0;

        if (unlockModules && isFirstGame) {
          clickable = true;
        }

        return {
          name,
          completed: val,
          clickable,
        };
});
};

  return (
    <div
      style={{
          position: "absolute",
          top: "49%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          width: "85vw",        
          maxWidth: "300px",

          height: "auto",
          maxHeight: openIndex !== null ? " 100vh" : "80vh",
          overflowY: "auto",

          backgroundColor: "#f5e6c8",
          border: "2px solid black",
          borderRadius: "12px",
          padding: "6px",       
          zIndex: 20,
          fontFamily: "sans-serif",
        }}
    >
      <h2 style={{ textAlign: "center", fontSize: "16px", margin: "4px" }}>Select Module</h2>

            {modules.map((mod, index) => {
              const games = summary?.[mod.key]
                ? getGames(summary[mod.key])
                : [];

        return (
          <div key={index} style={{ marginBottom: "10px" }}>
            
            <div
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            style={{
                backgroundColor: "#e6c89c",
                border: "2px solid black",
                borderRadius: "8px",
                padding: "2px",
                fontSize: "12px",   
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{mod.name}</span>
              <span style={{ fontSize: "12px" }}>
                {openIndex === index ? "▼" : "▶"}
              </span>
            </div>
            </div>

        
            {openIndex === index && (
              <div style={{ marginTop: "5px" }}>
                {games.map((game, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (!game.clickable) return;
                      if (!game.clickable) return;

                        if (closeMenu) closeMenu(); 

                        navigate(routeMap[mod.key][game.name]);
                    }}
                    style={{
                      marginTop: "1px",
                      padding: "1px",
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