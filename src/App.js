import ListingTable from './components/ListingTable';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import * as React from 'react';
import LoginForm from "./components/loginForm";
import FriendsPage from "./components/friendsPage";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  const adminUser = {
    email:"a",
    password:"a"
  };

  const [user,setUser] = React.useState({name:"", email:""});
  const [error,setError] = React.useState("");

  const Login = details => {
    console.log(details);

    if (details.email === adminUser.email && details.password === adminUser.password) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email
      });
    } else {
      console.log("Details do not match");
      setError("Details do not match");
    };
  };

  return (
    <div className="App">
      {(user.email !== "") ? (
        <Router>
          <div className = "app">
            <NavBar Logout={() => {
              setUser({name: "", email: ""});
            }}/>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/friends" component={FriendsPage} />
              <Route path="/listing" component={ListingTable} />
            </ Switch>
          </div>
        </ Router>
      ) : (
        <LoginForm Login={Login} error={error}/>
      )
      }
    </div>
    );
}

export default App;
