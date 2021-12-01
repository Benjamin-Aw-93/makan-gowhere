import axios from 'axios';

/*
Component that helps us to query food places within a designated area. 
Can be modified to take in additonal inputs to query other things other than restaurants.  
*/

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng'


const getPlacesData = async (lat, lng) => {
    try {
        const { data : {data} } = await axios.get(URL, {
          params: {
            latitude: lat,
            longitude: lng,
            limit: '50',
            currency: 'SGD',
            open_now: 'false',
            lunit: 'km',
            lang: 'en_US'
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
          }
        });
        
        return data;

    } catch (error) {
        console.log(error);
    }
}

export default getPlacesData;