import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from "./utils/PrivateRoute";
import PrivateProfileRoute from "./utils/PrivateProfileRoute";

import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';


function App() {
  return (
    <div className="App">
     
      <Router>
        <AuthProvider>
        <Header/>
        <Routes> 
          <Route path="/" element={<PrivateRoute />} exact /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/signup" element={<SignupPage />} /> 
          <Route path="/profile" element={<PrivateProfileRoute />} /> 
          <Route path="/admin_dashboard" element={<AdminPage />} /> 
        </Routes>
        <Footer/>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
