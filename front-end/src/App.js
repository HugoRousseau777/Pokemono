import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Nav/>
     <Routes>
       <Route path="/" element={<h1>Component principal</h1>}/>
     </Routes>
     <h1>Yoyoyo</h1>
     </BrowserRouter>
    </div>
  );
}

export default App;
