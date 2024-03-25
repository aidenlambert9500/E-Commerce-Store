import './App.css';
import Homepage from './component/Homepage';
import Productpage from './component/Productpage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/Productpage' element={<Productpage />} />
        </Routes>
    </Router>
  )    
}

export default App;
