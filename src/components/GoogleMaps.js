import * as React from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    //InfoWindow,
    Circle,
} from '@react-google-maps/api';

const libraries = ["places"];

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};


const circleOptions = {
    strokeColor: '#fa314a',
    strokeOpacity: 0.8,
    fillColor: '#fa314a',
    fillOpacity: 0.1,
    visible: true,
    radius: 500,
  }

const options = {
    disableDefaultUI: true,
    zoomControl: true,
}


function GoogleMaps(props){

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return(

        <GoogleMap 
        mapContainerStyle = {mapContainerStyle} 
        zoom = {16} 
        center = {props.calculatedCenter}
        options = {options}>
            {props.userList.map((marker) => (
                <Marker 
                key = {marker.id}
                animation = {window.google.maps.Animation.BOUNCE}
                position = {{lat: marker.lat, lng: marker.lng}}
                icon = {{
                    url: "https://img.icons8.com/ios-glyphs/60/fa314a/arms-up.png",
                    scaledSize: new window.google.maps.Size(60,60),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(30, 30),
                }}
                />
            ))}
            <Circle
                center = {props.calculatedCenter}
                options = {circleOptions}
                />
        </GoogleMap>
    )
};

export default GoogleMaps;
