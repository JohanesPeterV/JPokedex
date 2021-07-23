import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Entry from './Pages/PageEntry/Entry';

function App() {
  return (
    <Router>
      <Entry/>
    </Router>
  );
}

export default App;
