import { resetWarningCache } from 'prop-types';
import React, { Component, useState } from 'react';

// values: [
//     {
//         name: "Name",
//         description: "Change the name of your account",
//         tags: ['username', 'name']
//     },
//     {
//         name: "Login Credentials",
//         description: "Change the login credentials of your account",
//         tags: ['password','login']
//     },
//     {
//         name: "Email",
//         description: "Change the email of your account",
//         tags: ['email address']
//     }
// ]


const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  };




export default class SettingsPage extends React.Component {
    constructor(props) {
        super();
        this.state = { name:"", email:"", password:"", displayPopup:false};
        this.displayPopup = this.displayPopup.bind(this);
    };

    async loadData(name) {
        const query = `query {
            findSpecificUser(specificName:"${name}") {name, email, password}
        }`;
    
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query })
            });
            const result = await response.json();
    
            const userDetails = result.data.findSpecificUser;
            this.setState({ name: userDetails.name, email: userDetails.email, password:userDetails.password });
    
    };

    componentDidMount() {
        this.loadData("Ben");
    };

    displayPopup() {
        this.setState({ joinQueuePopup:true });
    };

    render() {
        console.log("state", this.state);

        return (
            <div>
                <h1> View Your Profile  </h1>
                <h1> Current Name: {this.state.name} </h1>  <button onClick={this.displayJoinQueuePopup}> Add Customer to Queue </button>
                <h1> Email: {this.state.email}  </h1>
                <h1> Password: {this.state.password}  </h1>
            </div>
        )
}
};