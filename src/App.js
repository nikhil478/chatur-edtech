import logo from './logo.svg';
import './App.css';
import Footer from "./components/Footer";
import HeaderBar from "./components/Header";
import CompletionPage from "./components/Completion"
import * as React from 'react';

function App() {
    const [active,setActive] = React.useState(true);
  return (
    <div className="App">
        <HeaderBar active={setActive}></HeaderBar>
        {active ? <Footer active={active}></Footer> : null }

    </div>
  );
}

export default App;
