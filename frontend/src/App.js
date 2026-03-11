import './App.css';
import { Home } from './pages/user/home.js';
import { CreateAccount } from './pages/user/createAccount.js';
import { Login } from './pages/user/login.js';
import Symptoms from './pages/module1/symptoms.js'
import Location from './pages/module1/location.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonalHygiene from './pages/module1/personalHygiene.js';

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
        <Route path="/module1/onLocation" element={<Location />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
