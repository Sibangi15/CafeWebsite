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
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from './layouts/AdminLayout';
import ManageMenu from './pages/admin/ManageMenu';
import Orders from './pages/admin/Orders';
import UserDetails from './pages/admin/UserDetails';
import Alert from "./components/Alert";


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
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/register" element={<Register showAlert={showAlert} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Cart />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="allmenu" element={<ManageMenu />} />
            <Route path="allorders" element={<Orders />} />
            <Route path="allusers" element={<UserDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;








