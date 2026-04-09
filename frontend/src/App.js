import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

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
function App() {
  return (
    <BrowserRouter>
      <OrientationGuard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<Map />} />
          <Route path="/module1" element={<M1Nav />} />
          <Route path="/module1/symptoms" element={<Symptoms />} />
          <Route path="/module1/personalHygiene" element={<PersonalHygiene />} />
          <Route path="/module1/onLocation" element={<Location />} />
          <Route path="/module2" element={<M2Nav />} />
          <Route path="/module2/therm" element={<Module2Part1/>} />
          <Route path="/module2/cleaning" element={<Cleaning />} />
          <Route path="/module2/cooking" element={<Cooking />} />
          <Route path="/module3" element={<M3Nav />} />
          <Route path="/module3/expiration" element={<Expiration />} />
          <Route path="/module3/canSorting" element={<Can />} />
          <Route path="/module3/allergenIdentification" element={<Allergen />} />
          <Route path="/module5/coldPreparedTransport" element={<ColdPrepTransport />} />
          <Route path="/module5/hotPreparedTransport" element={<HotPrepTransport />} />
          <Route path="/module6/foodServiceMishaps" element={<FoodServiceMishaps />} />
          <Route path="/module6/foodServiceSetUp" element={<ServiceSetUps />} />
        </Routes>
      </OrientationGuard>
    </BrowserRouter>
  );
}

export default App;