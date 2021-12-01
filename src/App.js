/*
Importing modules
*/

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import GoogleMaps from './components/GoogleMaps';
import * as React from 'react';
import LoginForm from "./components/loginForm";
import FriendsPage from "./components/friendsPage";
import Listings from "./components/Listings";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import getPlacesData from './travelAdvisorAPI/travelAdvisorAPI';


const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d'); // Setting Date

function jsonDateReviver(key, value) { 
  if (dateRegex.test(value)) return new Date(value); // Returning a proper Date 
  return value;
}

/*
GraphQL fectch function to POST our query to monoDB
*/

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
  
/*
Start of our application
*/
function App() {

  /*
  All state hookes used in this project
  */

  const [user,setUser] = React.useState({name:"", email:""}); // Current User 
  const [userCoord, setUserCoord] = React.useState({lat: 0 , lng: 0}); // Current User coordinates
  const [friends,setFriends] = React.useState([]); // Current list of friends
  const [userwithFriends, setUserWithFriends] = React.useState([]); // Listing of user with his friends
  const [error,setError] = React.useState(""); // Error when wrong email and password is being input
  const [places, setPlaces] = React.useState([]); // Food places generated
  const [cardPlaces, setCardPlaces] = React.useState([]); // User nearest food location to be displayed on the main page 
  const [filteredPlaces, setFilteredPlaces] = React.useState([]); // When using the filter functions
  const [isLoading, setIsLoading] = React.useState(false); // To control loading circle when querying from API
  const [coordinates, setCoordiantes] = React.useState({lat: 0, lng: 0}); // Central location coordinates
  const [childClicked, setChildClicked] = React.useState(null); // Indicator for when a node is clicked, used to scroll card
  const [rating, setRating] = React.useState(''); // Used for filtering places by ratings 
  const [loggedin, setLoggedIn] = React.useState(false); 

  /*
  Function used to check if log in details are correct or not
  */
  
  const Login = details => {
    console.log(details);

    if (details.email === user.email && details.password === user.password) {
      console.log("Logged in");
      setLoggedIn(true);
    } else {
      console.log("Details do not match");
      setError("Details do not match");
    };
  };

  /*
  Function used to query friends data from monoDB
  */
  
  const loadData = async () => {
    const query = `query {
      userList{_id, name, cusine, lat, lng}
    }`;

    const data = await graphQLFetch(query);
  
    if (data) {
      setFriends(data.userList);
      }

    };

  const loadMainUser = async () => {
    const query = `query {
      getMainUser{_id, name, email, password, current}
    }`;

    const data = await graphQLFetch(query);
  
    if (data) {
      setUser(data.getMainUser);
      }

    };
  
  /*
  When ratings change filter out all the places with ratings greater than the selected rating
  */

  React.useEffect(() => {

    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);

  }, [rating]);

  /*
  When the list of friend changes, set current user with the group of friends to be displayed in Google Maps
  */
  React.useEffect(() => {

    const currUser = {
      name: user.name,
      lat: userCoord.lat,
      lng: userCoord.lng,
      current: user.current,
    }

    setUserWithFriends([currUser, ...friends]);

  }, [friends]);

  /*
  When the application is first loaded, load all the friends in, find the user's position through the lat and lng coordincates, and find his nearest food places. 
  */
  React.useEffect(() => {
    
    loadData();
    
    loadMainUser();

    navigator.geolocation.getCurrentPosition(function(position) {
      setUserCoord({
        lat: position.coords.latitude , 
        lng: position.coords.longitude  
      });
      
      getPlacesData(position.coords.latitude, position.coords.longitude)
      .then((data) => { 
        setCardPlaces(data.slice(0, 5));
      });
    });
  }, []);

  React.useEffect(() => {
    const currUser = {
      name: user.name,
      lat: userCoord.lat,
      lng: userCoord.lng,
      current: user.current,
    }

    setUserWithFriends([currUser, ...friends]);

  }, [loggedin])

  /*
  Function to update food listing with averged lat and lng coordinates
  */

  let updateListing = () => {
    setIsLoading(true)
    getPlacesData(coordinates.lat, coordinates.lng)
      .then((data) => {
        setPlaces(data);
        setFilteredPlaces([]);
        setIsLoading(false);
        updateCoordinates();
    })
  }

  /*
  Function to update coordinates, with the group of friends along with the user, we find the avergae lat and long to determine the cetriod of all the points. 
  Then set that as the coordinates to be passed into the maps. 
  */

  let updateCoordinates = () => {

    const result = userwithFriends.reduce((a, {lat, lng}) => {
      a.lat += lat;
      a.lng += lng;
        return a;
    }, {lat: 0, lng: 0})

    const calculatedCenter = {
      lat: result.lat/userwithFriends.length,
      lng: result.lng/userwithFriends.length,
    }
    
    setCoordiantes(calculatedCenter);

  }

  /*
  All components links managed by Router. 
  If the email entered correctly along with the password, display the page to the user, else display the error. 
  */

  return (
    <div className="App">
      {(loggedin) ? (
        <Router>
          <div className = "app">
            <NavBar Logout={() => {
              setLoggedIn(false)
            }}/>
            <Switch>
              <Route path="/" exact>
                <HomePage cardPlaces = {cardPlaces} user = {user}/>
              </Route>
              <Route path="/friends">
                <FriendsPage friends = {friends} setFriends = {setFriends} updateCoordinates = {updateCoordinates}/>
              </Route>
              <Route path="/maps"> 
                <Grid container spacing={3} style={{ width: '100%' }}>
                  <Grid item xs={12} md={4}>
                    <Listings childClicked = {childClicked} isLoading ={isLoading} updateListing = {updateListing} places = { filteredPlaces.length ? filteredPlaces : places } rating = {rating} setRating = {setRating}/>
                  </Grid>
                  <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <GoogleMaps setChildClicked = {setChildClicked} places = { filteredPlaces.length ? filteredPlaces : places } friends = {userwithFriends} calculatedCenter = {coordinates}  />
                  </Grid>
                </Grid>
              </Route>
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
