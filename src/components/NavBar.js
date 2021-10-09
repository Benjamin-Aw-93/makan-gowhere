//import ReactDOM from 'react-dom';
import * as React from 'react';
//import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class NavBar extends React.Component {
    state = {menuClicked:false};

    handleClick = () => {
        this.setState({ menuClicked: !this.state.menuClicked });
    };

    render() {
        return (
            <nav className="navBarItems">
                <Link to="/"><h1 className="navbar-logo" >Makan Go-Where <i className="fa-solid fa-react"></i></h1></Link>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.menuClicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.menuClicked ? 'nav-menu active' : 'nav-menu'}>
                    <Link to="/friends"><li className="nav-links" > Friends Outing 101 </li></Link>
                    <Link to="/listing"><li className="nav-links" > Check Restaurant Listing</li></Link>
                </ul>
                <button className="btn btn--primary btn--medium fas fa-user-circle" onClick={this.props.Logout}> Logout </button>
            </nav>
        );
    }
};

export default NavBar;
