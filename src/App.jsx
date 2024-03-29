import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Item from './pages/Item';
import MyGallery from './pages/MyGallery';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordReset from './pages/PasswordReset';
import Logout from './pages/Logout';
import NoUserRoute from './components/NoUserRoute';
import UserOnlyRoute from './components/UserOnlyRoute';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/NavBar';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <div className="App">
            <header>
              <Navbar />
            </header>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/item/:itemId" element={<Item />} />
              <Route path="/mygallery" element={<MyGallery />} />
              <Route
                path="/login"
                element={
                  <NoUserRoute>
                    <Login />
                  </NoUserRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <NoUserRoute>
                    <Register />
                  </NoUserRoute>
                }
              />
              <Route
                path="/password-reset"
                element={
                  <NoUserRoute>
                    <PasswordReset />
                  </NoUserRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <UserOnlyRoute>
                    <Logout />
                  </UserOnlyRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
