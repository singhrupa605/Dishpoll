import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PollResults from './components/PollResults';
import './App.css';
import { Route, Routes } from "react-router-dom";



function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/pollresults" element={<PollResults />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
