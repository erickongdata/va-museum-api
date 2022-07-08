import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AppProvider } from './AppContext';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
