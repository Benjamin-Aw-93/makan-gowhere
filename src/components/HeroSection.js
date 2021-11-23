import Button from "./Button";
import "../css/HeroSection.css";
import ReactPlayer from 'react-player/youtube'

function HeroSection() {
    return (
        <div className="hero-container">
            <h1>Your food adventure begins here</h1>
            <p>What are you waiting for?</p>
            <ReactPlayer url='https://www.youtube.com/watch?v=lcU3pruVyUw' playing = {true} loop = {true} volume = {0.3}/>
            <div className="hero-btns" buttonStyle="btn--outline" buttonSize="btn--large">
                <Button 
                    className="btns" 
                    buttonStyle="btn--primary"
                    buttonSize="btn--large"
                >
                    Get started
                </Button>
                <Button 
                    className="btns" 
                    buttonStyle="btn--outline"
                    buttonSize="btn--large"
                >
                    Watch trailer <i className = "far fa-play-circle" />
                </Button>

            </div>
        </div>
    )
}

export default HeroSection;
