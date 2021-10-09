import * as React from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    //InfoWindow,
    Circle,
} from '@react-google-maps/api';

const friendMarkers = [
    {id: 1, lat: 1.3600535930000293, lng: 103.86048691689761 },
    {id: 2, lat: 1.365167209027227, lng: 103.87014870107947 },
    {id: 3, lat: 1.3528036032709148, lng: 103.86955762722366 },
]

const libraries = ["places"];

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};

const center = {
    lat: 1.35934146843,
    lng: 103.866731082,
}

const calculatedCenter = {
    lat: 1.35934146843,
    lng: 103.866731082,
}

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


function GoogleMaps(){

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
        center = {center}
        options = {options}>
            {friendMarkers.map((marker) => (
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
                center = {calculatedCenter}
                options = {circleOptions}
                />
        </GoogleMap>
    )
};

export default GoogleMaps;
