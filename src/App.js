import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Stock from './components/Stock/Stock';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/stock/:id" element={<Stock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
