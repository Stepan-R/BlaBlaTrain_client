import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { Route, Routes, Navigate } from 'react-router-dom';
import { Signup } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to='/login' />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default App
