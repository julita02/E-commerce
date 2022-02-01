import React from 'react';
import './App.css';

import { Routes,Route} from "react-router-dom";

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE </h1>
  </div>
);

function App() {
  return (
    <div >
      {/* <HomePage /> */}
     
      <Routes>
        <Route path ='/' element={<HomePage/>}></Route>
        <Route path='/hats' element={<HatsPage/>}></Route>

        </Routes>
      
    </div>
  );
}

export default App;