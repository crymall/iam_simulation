import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <nav>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
          
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;