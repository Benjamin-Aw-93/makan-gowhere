import ListingTable from './components/ListingTable';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import GoogleMaps from './components/GoogleMaps';
import * as React from 'react';
import LoginForm from "./components/loginForm";
import FriendsPage from "./components/friendsPage";
import SettingsPage from "./components/Settings";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
};
  

function App() {

  const adminUser = {
    email:"a",
    password:"a"
  };

  const [user,setUser] = React.useState({name:"", email:""});
  const [error,setError] = React.useState("");
  const [userList, setUserList] = React.useState([]);
  
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

  const loadData = async () => {
    const query = `query {
      userList{_id, name, lat, lng}
    }`;

    const data = await graphQLFetch(query);
  
    if (data) {
      setUserList(data.userList);
      }
    };
  
  const result = userList.reduce((a, {lat, lng}) => {
    a.lat += lat;
    a.lng += lng;
      return a;
  }, {lat: 0, lng: 0});


  const calculatedCenter = {
      lat: result.lat/userList.length,
      lng: result.lng/userList.length,
  }


  React.useEffect(() => {
    loadData();
  }, []);



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
              <Route path="/maps"> <GoogleMaps userList = {userList} calculatedCenter = {calculatedCenter}/></Route>
              <Route path="/settings" component={SettingsPage} />
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
