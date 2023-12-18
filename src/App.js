// import logo from './logo.svg';
import './App.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
