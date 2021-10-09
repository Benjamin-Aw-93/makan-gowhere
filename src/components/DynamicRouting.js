import React, {Component} from "react"
import axios from "axios";

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

const options = {
    params: {
      bl_latitude: '11.847676',
      tr_latitude: '12.838442',
      bl_longitude: '109.095887',
      tr_longitude: '109.149359',
    },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': 'c01fc8ee09msh5afb1a5028819f1p1788a7jsn5607fa8ca772'
    }
  };

const getPlacesData = async () => {
    try {
        const response = axios.get(URL, options);
        console.log(response);
        // return response;
    } catch (error) {
        console.log(error);
    };
};

class DynamicRoutingTest extends Component {
    componentDidMount() {
        getPlacesData();
    };

    render() {
        return (
            <div>hello world</div>
        )
    }
}
   
export default DynamicRoutingTest;