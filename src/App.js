import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Dashboard from './Components/Dashboard';
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact component={Dashboard} />

          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
