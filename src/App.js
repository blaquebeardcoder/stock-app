import './App.css';
import React from "react";
import Header from "./components/Header";
import Stocks from "./components/Stocks";

function App() {
  return (
    <div className="App">
      <Header />
      <Stocks />
    </div>
  );
}

export default App;