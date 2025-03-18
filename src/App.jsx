import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { Route, Routes, Navigate } from 'react-router-dom';
import { Signup } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { useAuthContext } from './hooks/useAuthContext';
import { TripsPage } from "./pages/TripsPage";
import { CreateTripPage } from "./pages/CreateTripPage";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to='/login' />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/trips" element={user ? <TripsPage /> : <Navigate to='/login' />} />
        <Route path="/publish" element={<CreateTripPage />} />
      </Routes>
    </>
  )
}

export default App
