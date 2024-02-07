import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import Combat from './components/Combat';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
     <Routes>
       <Route path="/" element={<Nav/>}/>
       <Route path="/combat" element={<Combat/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
