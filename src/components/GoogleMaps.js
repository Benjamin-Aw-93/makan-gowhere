import * as React from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    Circle,
} from '@react-google-maps/api';
import { Box, Paper, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const libraries = ["places"];

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};


const paperStyle = {
    padding: '10px', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    width: '100px',
};

const circleOptions = {
    strokeColor: '#fa314a',
    strokeOpacity: 0.8,
    fillColor: '#fa314a',
    fillOpacity: 0.1,
    visible: true,
    radius: 1500,
  }

const options = {
    disableDefaultUI: true,
    zoomControl: true,
}

function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

    var num = 12742 * Math.asin(Math.sqrt(a))
    
    return Math.round(num * 100) / 100 
  }


function GoogleMaps({ setChildClicked, places, friends, calculatedCenter }){

    const [map, setMap] = React.useState(null)
    const [selected, setSelected] = React.useState(null);
    const [placeselected, setPlacesSelected] = React.useState(null);

    const onLoad = React.useCallback((map) => {
        setMap(map);
    }, []);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return(

        <GoogleMap 
        mapContainerStyle = {mapContainerStyle} 
        zoom = {14} 
        center = {calculatedCenter}
        options = {options}
        onLoad = {onLoad}
        >   
            
            {places?.map((place, i) => (
                <Marker 
                key = {i}
                position = {{lat: Number(place.latitude), lng: Number(place.longitude)}}
                onClick = {() => {
                    setPlacesSelected(place);
                    setChildClicked(i);
                }}
                />
            ))}
            
            {placeselected ? (
                <InfoWindow 
                    position = {{ lat: Number(placeselected.latitude), lng: Number(placeselected.longitude) }} 
                    onCloseClick = {() => {setPlacesSelected(null);}}>
                <Paper elevation={3} className={paperStyle}>
                <Box display = 'flex' justifyContent = 'space-between'>
                    <Typography variant="subtitle2" gutterBottom> {placeselected.name}</Typography>
                </Box>
                <Box display = 'flex' justifyContent = 'space-between'>
                    <img 
                        cursor = { {cursor:'pointer'} }
                        src = {placeselected.photo ? placeselected.photo.images.small.url : 'https://uhcl-ir.tdl.org/bitstream/handle/10657.1/1573/not-available.jpg.jpg?sequence=1&isAllowed=y'}
                    />
                </Box>
                <Box display = 'flex' justifyContent = 'space-between'>
                    <Rating name="read-only" size="small" value={Number(placeselected.rating)} readOnly />
                </Box>
                    </Paper>
                </InfoWindow>) : null}

            {friends?.map((marker) => marker.current ? (
                <Marker 
                key = {marker.id}
                animation = {window.google.maps.Animation.BOUNCE}
                position = {{lat: marker.lat, lng: marker.lng}}
                icon = {{
                    url: "https://img.icons8.com/ios-glyphs/60/6c33c0/arms-up.png",
                    scaledSize: new window.google.maps.Size(60,60),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(30, 30),
                }}
                onClick = {() => {
                    setSelected(marker);
                }}
                /> ): (
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
                onClick = {() => {
                    setSelected(marker);
                }}
                />
                )
            )}

            {selected ? (
                <InfoWindow 
                    position = {{ lat: selected.lat, lng: selected.lng }} 
                    onCloseClick = {() => {setSelected(null);}}>
                <div>
                    <h2>{selected.name} is here!</h2>
                    <p>Average distance away from food places: {distance(selected.lat, selected.lng, calculatedCenter.lat, calculatedCenter.lng)} km</p>
                </div>
                </InfoWindow>) : null}
            
            <Circle
                center = {calculatedCenter}
                options = {circleOptions}
            />
        </GoogleMap>
    )
};

export default GoogleMaps;
