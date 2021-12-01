import * as React from 'react';
import {Link} from "react-router-dom";

/*
The navigation pannel help users navigate the website. This is done by creating links that are controlled by router. 
*/

const NavBar = ({Logout}) => {

    const [menuClicked, handleClick] = React.useState(false);

        return (
            <nav className="navBarItems">
                <Link to="/"><h1 className="navbar-logo" >Makan Go-Where<i className="fa-solid fa-react"></i></h1></Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={menuClicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={menuClicked ? 'nav-menu active' : 'nav-menu'}>

                    <Link to="/friends"><li className="nav-links" > Friends Outing 101 </li></Link>
                    <Link to="/maps"><li className="nav-links" > Maps + Check Restaurant Listing</li></Link>
                    <Link to="/settings"><li className="nav-links" > Settings </li></Link>
                </ul>
                <button className="btn btn--primary btn--medium fas fa-user-circle" onClick={Logout}> Logout </button>
            </nav>
        );
    
};

export default NavBar;
