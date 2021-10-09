import React from 'react';
import CardItem from './CardItem';
import '../css/Cards.css';

const restaurantData = [
    {
        imageUrl:"https://d1nqx6es26drid.cloudfront.net/app/uploads/2021/04/26200522/CNC.png",
        text:"McDonald's has a new burger!",
        label: ["Western"]
    },
    {
        imageUrl:"https://www.kfc.com.sg//Content/OnlineOrderingImages/Menu/Category/Carousel/HomePage-KFC-Billboard-D-v2.jpg",
        text:"Finger Licking Good!",
        label: "Western"
    },
    {
        imageUrl:"https://upload.wikimedia.org/wikipedia/commons/7/75/Newton_HokkienMee.JPG",
        text:"Support local shops!",
        label: "Local"
    }
]

function Cards() {
    const restaurantList = restaurantData.map(restaurant => 
        <CardItem 
            src={restaurant.imageUrl}
            text={restaurant.text}
            label={restaurant.label}
            path="/friends"
        />
    );
    return (
        <div className="cards">
            <h1>Check out these restaurants</h1>
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