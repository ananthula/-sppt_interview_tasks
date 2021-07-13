import './App.css';
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {  Router, Route, Switch } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Main from './components/Main';
import {history} from './history';

function App() {
  return (
    <Router history={history}>
      <Switch>
           <Route exact path="/" component={Dashboard} />
          <Route exact path="/events" component={Dashboard} />
          <Route exact path="/events/:id" component={Main} />
      </Switch>
      </Router>
   
    
  );
}

export default App;
