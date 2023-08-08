import './css/main.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Error from './pages/Error';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ (isAuthenticated) ? <Navigate to="/profile" /> : <Login />}/>
        <Route path="/profile" element={ (isAuthenticated) ? <Profile /> : <Navigate to="/login" />}/>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  )
}