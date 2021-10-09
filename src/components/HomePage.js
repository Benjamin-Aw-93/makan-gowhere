//import ReactDOM from 'react-dom';
import * as React from 'react';
import Cards from './Cards';
//import PropTypes from 'prop-types';
import HeroSection from './HeroSection';

class HomePage extends React.Component {

    render() {
        return (
            <>
                <HeroSection />
                <Cards />
            </>
        );
    }
};

export default HomePage;
