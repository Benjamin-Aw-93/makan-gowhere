import React, { Component } from 'react';
import Button from "./Button";
import "../css/HeroSection.css";

function HeroSection() {
    return (
        <div className="hero-container">
            <video src="" autoPlay loop muted/>
            <h1>Your food adventure begins here</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns" buttonStyle="btn--outline" buttonSize="btn--large">
                <Button 
                    className="btns" 
                    buttonStyle="btn--outline"
                    buttonSize="btn--large"
                >
                    Get started
                </Button>
                <Button 
                    className="btns" 
                    buttonStyle="btn--primary"
                    buttonSize="btn--large"
                >
                    Watch trailer <i className = "far fa-play-circle" />
                </Button>

            </div>
        </div>
    )
}

export default HeroSection;