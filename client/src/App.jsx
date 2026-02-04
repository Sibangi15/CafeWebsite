import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
// import NoteState from './context/notes/NoteState';
// import Alert from './components/Alert';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Menu from './pages/Menu';

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
      {/* <NoteState> */}
      <Router>
        <Navbar />
        <Routes><Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/register" element={<Register showAlert={showAlert} />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
      {/* </NoteState>  */}
    </div>
  );
}

export default App;





