import ListingTable from './components/ListingTable';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className = "app">
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/listing" component={ListingTable} />
        </ Switch>
      </div>
    </ Router>
    );
}

export default App;
