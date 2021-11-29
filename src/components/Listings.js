import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from './PlaceDetails';
import useStyles from '../css/Liststyles.js';
import Button from '@mui/material/Button';

const Listings = ({childClicked, updateListing, places, isLoading, rating, setRating}) => {
    const classes = useStyles();
    const [type, setType] = useState('restaurants');

    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {

        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
      
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant="h4">Are you ready to dig in?</Typography>
            <Typography variant="h6">Click to see where you friends are!</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="type">Type</InputLabel>
                <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="rating">Rating</InputLabel>
                <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="3">Above 3.0</MenuItem>
                    <MenuItem value="4">Above 4.0</MenuItem>
                    <MenuItem value="4.5">Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing = {6} className = {classes.container}>
            <Button variant="contained" component="span" onClick={() => { updateListing() }}>
                Search
            </Button>
            </Grid>
            {isLoading ? (
                <div className={classes.loading}>
                <CircularProgress size="5rem" />
              </div>
            ) : (
                <>
            <Grid container spacing = {3} className = {classes.list}>
                {places?.map((place, i ) => (
                    <Grid ref={elRefs[i]} item key = {i} xs = {12}>
                        <PlaceDetails 
                            selected={Number(childClicked) === i} 
                            refProp={elRefs[i]} 
                            place={place} 
                        />
                    </Grid>
                ))}
            </Grid>
                </>
            )}
        </div>
  );
};

export default Listings;