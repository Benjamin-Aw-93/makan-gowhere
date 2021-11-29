//import ReactDOM from 'react-dom';
import * as React from 'react';
import Cards from './Cards';
//import PropTypes from 'prop-types';
import HeroSection from './HeroSection';

function HomePage({cardPlaces, user}) {

    return (
        <>
            <HeroSection user = {user}/>
            <Cards cardPlaces = {cardPlaces}/>
        </>
    );

};

export default HomePage;
