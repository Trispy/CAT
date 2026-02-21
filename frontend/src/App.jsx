import './App.css';
import { Home } from './pages/user/home.jsx';
import { CreateAccount } from './pages/user/createAccount.jsx';
import { Login } from './pages/user/login.jsx';
import { Symptoms } from './pages/module1/symptoms.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonalHygiene from './pages/user/personalHygiene.jsx';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
