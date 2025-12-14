import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Workout from './pages/Workout';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/:weekId/:dayId" element={<Workout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
