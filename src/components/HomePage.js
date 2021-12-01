import * as React from 'react';
import Cards from './Cards';
import HeroSection from './HeroSection';

/*
Homepage componenet: Here we have 2 componenet 
1) The herosection, which acts as an introductory page 
2) The cards, which display all the nearby places to the user
*/


function HomePage({cardPlaces, user}) {

    return (
        <>
            <HeroSection user = {user}/>
            <Cards cardPlaces = {cardPlaces}/>
        </>
    );

};

export default HomePage;
