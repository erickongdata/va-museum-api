import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Item from './pages/Item';
import MyGallery from './pages/MyGallery';
import { AppProvider } from './AppContext';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:itemId" element={<Item />} />
            <Route path="/mygallery" element={<MyGallery />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
