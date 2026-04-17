import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';

import { Home } from './pages/user/home.js';
import { CreateAccount } from './pages/user/createAccount.js';
import { Login } from './pages/user/login.js';
import Symptoms from './pages/module1/symptoms.js';
import PersonalHygiene from './pages/module1/personalHygiene.js';
import Module2Part1 from './pages/module2/module2part1.js';
import Location from './pages/module1/location.js';
import Cleaning from './pages/module2/chopping.js';
import Cooking from './pages/module2/cooking.js';
import Can from './pages/module3/cansort.js';
import Map from "./pages/user/map.js";
import OrientationGuard from "./components/orientationguard";
import Allergen from './pages/module3/allergens.js';
import CoolerPack from './pages/module4/sorting.js';
import TruckPack from './pages/module4/packing.js';
import ColdPrepTransport from './pages/module5/coldPreparedTransport.js';
import HotPrepTransport from './pages/module5/hotPreparedTransport.js';
import FoodServiceMishaps from './pages/module6/foodServiceMishaps.js';
import ServiceSetUps from './pages/module6/serviceSetUp.js';
import CleanTote from './pages/module4/cleanTote.js';

import M1Nav from './pages/module1/module1Navigate.js';
import M2Nav from './pages/module2/module2Navigate.js';
import M3Nav from './pages/module3/module3Navigate.js';
import M4Nav from './pages/module4/module4Navigate.js';
import M5Nav from './pages/module5/module5Navigate.js';
import M6Nav from './pages/module6/module6Navigate.js';

import Expiration from './pages/module3/expiration.js';
import Menu from './components/menu.js';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchSummary = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    return fetch(`${API}/api/game/moduleSummary`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(() => {
        setSummary(null);
        setLoading(false);
      });
  };

  // initial load
  useEffect(() => {
    fetchSummary();
  }, []);

  const isUnlocked = (moduleKey, gameKey) => {
  if (!summary) return null;

  const moduleOrder = {
    module1: ["symptoms", "personalHygiene", "location"],
    module2: ["module2part1", "chopping", "cooking"],
    module3: ["cansort", "expiration", "allergenIdentification"],
    module4: ["cleanTote", "sorting", "packing"],
    module5: ["cold", "hot"],
    module6: ["serviceSetup", "foodServiceMishaps"]
  };

  const val = summary[moduleKey]?.[gameKey];
  const games = moduleOrder[moduleKey];
  const index = games.indexOf(gameKey);

  const m1Done = summary?.finished_m1 === true;
  const m2Done = summary?.finished_m2 === true;
  const unlockModules = m1Done && m2Done;

  const isFirstGame = index === 0;

  if (val === true) return true;


  if (moduleKey === "module1" || moduleKey === "module2") {
    if (index === 0) return true;
    return summary[moduleKey]?.[games[index - 1]] === true;
  }

  if (!unlockModules) return false;


  if (isFirstGame) return true;

  return summary[moduleKey]?.[games[index - 1]] === true;
};

  //can add forbidden in another
  const Forbidden = () => (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#111",
      color: "white",
      fontFamily: "sans-serif",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "48px" }}>403</h1>
      <h2>Forbidden</h2>
      <p>You do not have access to this game yet.</p>
    </div>
  );

  const protect = (moduleKey, gameKey, element) => {
  if (loading || !summary) return <div>Loading game...</div>;

  const unlocked = isUnlocked(moduleKey, gameKey);

  if (!unlocked) return <div>Loading game...</div>;

  return element;
};

  return (
    <BrowserRouter>
      <OrientationGuard>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<Map openMenu={() => setShowMenu(true)} />} />

          <Route path="/module1" element={<M1Nav />} />
          <Route path="/module1/symptoms"
            element={protect("module1", "symptoms",
              <Symptoms openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
            )}
          />
          <Route path="/module1/personalHygiene"
            element={protect("module1", "personalHygiene",
              <PersonalHygiene openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
            )}
          />
          <Route path="/module1/onLocation"
            element={protect("module1", "location",
              <Location openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
            )}
          />

          <Route path="/module2" element={<M2Nav />} />
          <Route path="/module2/therm"
            element={protect("module2", "module2part1",
              <Module2Part1 openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
            )}
          />
          <Route path="/module2/cleaning"
            element={protect("module2", "chopping",
              <Cleaning openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
            )}
          />
          <Route path="/module2/cooking"
            element={protect("module2", "cooking",
              <Cooking openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
            )}
          />
          <Route path="/module3" element={<M3Nav />} />

      <Route path="/module3/expiration"
        element={protect("module3", "expiration",
          <Expiration openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
        )}
      />

      <Route path="/module3/canSorting"
        element={protect("module3", "cansort",
          <Can openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
        )}
      />

      <Route path="/module3/allergenIdentification"
        element={protect("module3", "allergenIdentification",
          <Allergen openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
        )}
      />
      <Route path="/module4" element={<M4Nav />} />

        <Route path="/module4/toteCleaning"
          element={protect("module4", "cleanTote",
            <CleanTote openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
          )}
        />

        <Route path="/module4/coolerPack"
          element={protect("module4", "sorting",
            <CoolerPack openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
          )}
        />

        <Route path="/module4/packTruck"
          element={protect("module4", "packing",
            <TruckPack openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
          )}
        />
        <Route path="/module5" element={<M5Nav />} />

        <Route path="/module5/coldPreparedTransport"
          element={protect("module5", "cold",
            <ColdPrepTransport openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
          )}
        />

        <Route path="/module5/hotPreparedTransport"
          element={protect("module5", "hot",
            <HotPrepTransport openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
          )}
        />
        <Route path="/module6" element={<M6Nav />} />

        <Route path="/module6/foodServiceMishaps"
          element={protect("module6", "foodServiceMishaps",
            <FoodServiceMishaps openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
          )}
        />

        <Route path="/module6/foodServiceSetUp"
          element={protect("module6", "serviceSetup",
            <ServiceSetUps openMenu={() => setShowMenu(true)} refreshSummary={fetchSummary} />
          )}
        />
         

        </Routes>

        {showMenu && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.85)",
            height: "100%",
            zIndex: 80000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Menu closeMenu={() => setShowMenu(false)} />

            <div
              onClick={() => setShowMenu(false)}
              style={{
                position: "absolute",
                top: "2px",
                right: "120px",
                fontSize: "60px",
                color: "white",
                cursor: "pointer"
              }}
            >
              ✖
            </div>
          </div>
        )}

      </OrientationGuard>
    </BrowserRouter>
  );
}

export default App;