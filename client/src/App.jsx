import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Menu from './pages/Menu';
import Cart from './pages/Cart';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/register" element={<Register showAlert={showAlert} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;








