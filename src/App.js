import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from './Pages/Homepage';
import SearchPage from './Pages/SearchPage';
import DetailPage from './Pages/DetailPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/search/:uid' element={<SearchPage />} />
          <Route path='/:bookId' element={<DetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
