import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path='/' element={<DashboardLayout />}/>
            <Route path='/register' element={<Register />}/>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
