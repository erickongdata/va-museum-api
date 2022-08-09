import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Item from './pages/Item';
import MyGallery from './pages/MyGallery';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordReset from './pages/PasswordReset';
import { AppProvider } from './AppContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/item/:itemId" element={<Item />} />
              <Route path="/mygallery" element={<MyGallery />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/password-reset" element={<PasswordReset />} />
            </Routes>
          </div>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
