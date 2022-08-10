import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Item from './pages/Item';
import MyGallery from './pages/MyGallery';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordReset from './pages/PasswordReset';
import Logout from './pages/Logout';
import NoUserRoute from './hoc/NoUserRoute';
import UserOnlyRoute from './hoc/UserOnlyRoute';
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
            </Routes>
          </div>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
