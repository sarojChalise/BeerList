import React from 'react';
import './App.css';
import BeerList from './BeerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from './Headers';
function App() {
  return (<>
    <Headers />
    <BeerList />
  </>
  );
}

export default App;
