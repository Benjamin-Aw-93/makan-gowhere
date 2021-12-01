import React from 'react';
import CardItem from './CardItem';
import '../css/Cards.css';

/*
Cards componenet: 
This reads in the food places nearest to the user and display it to them.
*/
function Cards({cardPlaces}) {

    const restaurantList = cardPlaces.map(restaurant => //Card places contains a list of restaurants with all of their details inside it. 
        restaurant.name ? (
            <CardItem 
            src={restaurant.photo ? restaurant.photo.images.large.url : 'https://uhcl-ir.tdl.org/bitstream/handle/10657.1/1573/not-available.jpg.jpg?sequence=1&isAllowed=y'}
            text={restaurant.name}
            label={restaurant.cuisine ? restaurant.cuisine.length > 1 ? restaurant.cuisine[0].name : "Try it out now" : "Try it out now"}
            path= "/friends"
        />
        ) : null
    );
    return (
        <div className="cards">
            <h1>Check out these restaurants near you!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        {restaurantList}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards;