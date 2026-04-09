import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {useState} from 'react';
import { Home } from './pages/user/home.js';
import { CreateAccount } from './pages/user/createAccount.js';
import { Login } from './pages/user/login.js';
import Symptoms from './pages/module1/symptoms.js'
import PersonalHygiene from './pages/module1/personalHygiene.js';
import Module2Part1 from './pages/module2/module2part1.js'
import Location from './pages/module1/location.js'
import Cleaning from './pages/module2/chopping.js';
import Cooking from './pages/module2/cooking.js';
import Can from './pages/module3/cansort.js'
import Map from "./pages/user/map.js";
import OrientationGuard from "./components/orientationguard";
import Allergen from './pages/module3/allergens.js';
import ColdPrepTransport from './pages/module5/coldPreparedTransport.js';
import HotPrepTransport from './pages/module5/hotPreparedTransport.js';
import FoodServiceMishaps from './pages/module6/foodServiceMishaps.js';
import ServiceSetUps from './pages/module6/serviceSetUp.js';

import M1Nav from './pages/module1/module1Navigate.js';
import M2Nav from './pages/module2/module2Navigate.js';
import M3Nav from './pages/module3/module3Navigate.js';

import Expiration from './pages/module3/expiration.js'; 
import Menu from './components/menu.js';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <BrowserRouter>
      <OrientationGuard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<Map openMenu={() => setShowMenu(true)}/>} />
          <Route path="/module1" element={<M1Nav />} />
          <Route path="/module1/symptoms" element={<Symptoms openMenu={() => setShowMenu(true)}  />} />
          <Route path="/module1/personalHygiene" element={<PersonalHygiene openMenu={() => setShowMenu(true)}/>} />
          <Route path="/module1/onLocation" element={<Location openMenu={() => setShowMenu(true)}/>} />
          <Route path="/module2" element={<M2Nav />} />
          <Route path="/module2/therm" element={<Module2Part1 openMenu={() => setShowMenu(true)}/>} />
          <Route path="/module2/cleaning" element={<Cleaning openMenu={() => setShowMenu(true)}/>} />
          <Route path="/module2/cooking" element={<Cooking openMenu={() => setShowMenu(true)}/>} />
          <Route path="/module3" element={<M3Nav />} />
          <Route path="/module3/expiration" element={<Expiration openMenu={() => setShowMenu(true)}/>} />
          <Route path="/module3/canSorting" element={<Can openMenu={() => setShowMenu(true)}/>} />
          <Route path="/module3/allergenIdentification" element={<Allergen openMenu={() => setShowMenu(true)}/>} />
          <Route path="/module5/coldPreparedTransport" element={<ColdPrepTransport openMenu={() => setShowMenu(true)}/>} />
          <Route path="/module5/hotPreparedTransport" element={<HotPrepTransport openMenu={() => setShowMenu(true)}/>} />
           
          <Route path="/module6/foodServiceMishaps" element={<FoodServiceMishaps />} />
          <Route path="/module6/foodServiceSetUp" element={<ServiceSetUps />} />
            
        </Routes>
              {showMenu && (
        <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
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
                  fontSize: "40px",
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