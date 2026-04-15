import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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


  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API}/api/game/moduleSummary`, {
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
  }, []);


  const isUnlocked = (moduleKey, gameKey) => {
    if (!summary) return false;

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
      if (!m) continue;
      for (let key in m) {
        if (["_id", "username", "__v"].includes(key)) continue;
        allEntries.push([key, m[key]]);
      }
    }

    let lastTrue = -1;
    allEntries.forEach(([_, val], i) => {
      if (val === true) lastTrue = i;
    });

    const nextIndex = lastTrue === -1 ? 0 : lastTrue + 1;

    const mappedGameKey = nameMap[gameKey] || gameKey;

    const globalIndex = allEntries.findIndex(([key]) => {
      const mapped = nameMap[key] || key;
      return mapped === mappedGameKey;
    });

    const val = summary[moduleKey]?.[gameKey];

    let clickable = val === true || globalIndex === nextIndex;

    const unlockModules =
      summary?.finished_m1 === true &&
      summary?.finished_m2 === true;

    const moduleEntries = Object.entries(summary[moduleKey] || {});
    const isFirstGame = moduleEntries[0]?.[0] === gameKey;

    if (unlockModules && isFirstGame) {
      clickable = true;
    }

    return clickable;
  };
  const Forbidden = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#111",
      color: "white",
      fontFamily: "sans-serif",
      textAlign: "center"
    }}
  >
    <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>403</h1>
    <h2 style={{ marginBottom: "10px" }}>Forbidden</h2>
    <p>You do not have access to this game yet.</p>
  </div>
);

  const protect = (moduleKey, gameKey, element) => {
    if (loading) return <div>Loading...</div>;
    if (!isUnlocked(moduleKey, gameKey)) return <Forbidden />;
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
          <Route path="/module1/symptoms" element={protect("module1", "symptoms", <Symptoms openMenu={() => setShowMenu(true)} />)} />
          <Route path="/module1/personalHygiene" element={protect("module1", "personalHygiene", <PersonalHygiene openMenu={() => setShowMenu(true)} />)} />
          <Route path="/module1/onLocation" element={protect("module1", "location", <Location openMenu={() => setShowMenu(true)} />)} />

          <Route path="/module2" element={<M2Nav />} />
          <Route path="/module2/therm" element={protect("module2", "module2part1", <Module2Part1 openMenu={() => setShowMenu(true)} />)} />
          <Route path="/module2/cleaning" element={protect("module2", "chopping", <Cleaning openMenu={() => setShowMenu(true)} />)} />
          <Route path="/module2/cooking" element={protect("module2", "cooking", <Cooking openMenu={() => setShowMenu(true)} />)} />

          <Route path="/module3" element={<M3Nav />} />
          <Route path="/module3/expiration" element={protect("module3", "expiration", <Expiration openMenu={() => setShowMenu(true)} />)} />
          <Route path="/module3/canSorting" element={protect("module3", "cansort", <Can openMenu={() => setShowMenu(true)} />)} />
          <Route path="/module3/allergenIdentification" element={protect("module3", "allergenIdentification", <Allergen openMenu={() => setShowMenu(true)} />)} />

          <Route path="/module4" element={<M4Nav />} />
          <Route path="/module4/toteCleaning" element={protect("module4", "cleanTote", <CleanTote openMenu={() => setShowMenu(true)} />)} />
          <Route path="/module4/coolerPack" element={protect("module4", "sorting", <CoolerPack openMenu={() => setShowMenu(true)} />)} />
          <Route path="/module4/packTruck" element={protect("module4", "packing", <TruckPack openMenu={() => setShowMenu(true)} />)} />

          <Route path="/module5" element={<M5Nav />} />
          <Route path="/module5/coldPreparedTransport" element={protect("module5", "cold", <ColdPrepTransport openMenu={() => setShowMenu(true)} />)} />
          <Route path="/module5/hotPreparedTransport" element={protect("module5", "hot", <HotPrepTransport openMenu={() => setShowMenu(true)} />)} />

          <Route path="/module6" element={<M6Nav />} />
          <Route path="/module6/foodServiceMishaps" element={protect("module6", "foodServiceMishaps", <FoodServiceMishaps openMenu={() => setShowMenu(true)} />)} />
          <Route path="/module6/foodServiceSetUp" element={protect("module6", "serviceSetup", <ServiceSetUps openMenu={() => setShowMenu(true)} />)} />

        </Routes>

        {showMenu && (
          <div
            style={{
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
            }}
          >
            <Menu closeMenu={() => setShowMenu(false)} />

            <div
              onClick={() => setShowMenu(false)}
              style={{
                position: "absolute",
                top: "2px",
                right: "120px",
                fontSize: "60px",
                color: "white",
                cursor: "pointer",
                zIndex: 80000
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