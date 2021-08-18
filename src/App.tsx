import './App.css';
import { Header } from './layout/header';
import { SideMenu } from './layout/side-menu';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Pages } from './pages';
import GlobalContextProvider from './context';

function App() {
  return (
    <Router>
      <GlobalContextProvider>
        <div className="App">
          <SideMenu />
          <Pages />
        </div>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
