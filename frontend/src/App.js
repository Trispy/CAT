import { BrowserRouter, Routes, Route } from 'react-router-dom';import './App.css';
import { Home } from './pages/user/home.js';
import { CreateAccount } from './pages/user/createAccount.js';
import { Login } from './pages/user/login.js';
import Symptoms from './pages/module1/symptoms.js';
import PersonalHygiene from './pages/module1/personalHygiene.js';
import Module2Part1 from './pages/module2/module2part1.js';
import Location from './pages/module1/location.js';
import Cleaning from './pages/module2/chopping.js';


function App() {
  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/module1/symptoms" element={<Symptoms />} />
        <Route path="/module2part1" element={<Module2Part1/>} />
        <Route path="/module1/personalHygiene" element={<PersonalHygiene />} />
        <Route path="/module1/onLocation" element={<Location />} />
        <Route path="/module2/cleaning" element={<Cleaning />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
