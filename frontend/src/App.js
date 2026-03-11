import './App.css';
import { Home } from './pages/user/home.js';
import { CreateAccount } from './pages/user/createAccount.js';
import { Login } from './pages/user/login.js';
import Symptoms from './pages/module1/symptoms.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonalHygiene from './pages/user/personalHygiene.js';
import Module2Part1 from './pages/user/module2part1.js'

function App() {
  return (
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/module1/symptoms" element={<Symptoms />} />
        <Route path="/personalhygiene" element={<PersonalHygiene />} />
        <Route path="/module2part1" element={<Module2Part1/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
