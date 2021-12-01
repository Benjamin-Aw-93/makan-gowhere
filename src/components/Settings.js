import { resetWarningCache } from 'prop-types';
import React, { Component, useState } from 'react';
import "../css/settingsPage.css";

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  };


class InfoPopup extends React.Component {
    constructor() {
        super();
    }


    render() { 
        return (
            <div className="popup-box" >
                <div className="box" >
                    <span className="close-icon" onClick={this.props.handleClose}>x</span>
                    <form name='custDetails' >
                        <span> New {this.props.infoToChange}: </span><input id="test" type="text" name="name" placeholder="Name" /><br />
                        <button onClick={e => this.props.handleSubmit(this.props.infoToChange, e.target.value , this.props.userDetails.name )}>Change Details</button>
                    </form>
                </div>
            </div>
           );
    };
};

class SettingsPage extends React.Component {
    constructor(props) {
        super();
        this.state = { userDetails:{name:"", email:"", password:""}, displayPopup:false, infoChange:''};
        this.displayPopup = this.displayPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
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
            this.setState({ userDetails:{name: userDetails.name, email: userDetails.email, password:userDetails.password} });
    };


    componentDidMount() {
        console.log(this.props);
        this.loadData(this.state.userDetails.name == "" ? this.props.user.name : this.state.userDetails.name);
    };

    displayPopup(category) {
        console.log("Button clicked");
        this.setState({ displayPopup:true, infoChange:category });
    };

    closePopup() {
        this.setState({ displayPopup:false });
    };

    async changeCustomerDetails(category, newInfo, currName) {
        if (category = 'Name') {
            const query = `mutation {
                updateCustomerName (
                  infoToUpdate:"${newInfo}", specificName:"${currName}"
                ) { name, email, password }
              }`;
              const response = await fetch('http://localhost:5000/graphql', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json'},
                  body: JSON.stringify({ query })
                  });
              const result = await response.json();
            };
            if (category = 'Email') {
                const query = `mutation {
                    updateCustomerEmail (
                        infoToUpdate:"${newInfo}", specificName:"${currName}"
                        ) { name, email, password }
                    }`;
                    const response = await fetch('http://localhost:5000/graphql', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({ query })
                        });
                    const result = await response.json();
                };
                if (category = 'Password') {
                    const query = `mutation {
                        updateCustomerPW (
                            infoToUpdate:"${newInfo}", specificName:"${currName}"
                            ) { name, email, password }
                        }`;
                        const response = await fetch('http://localhost:5000/graphql', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify({ query })
                            });
                        const result = await response.json();
        };

        this.loadData(category="Name" ? newInfo: currName);        

    };

    render() {

        return (
            <div>
                <h1> View Your Profile  </h1>
                <h1> Current Name: {this.state.userDetails.name} <button onClick={()=>this.displayPopup("Name")}> Change details </button></h1>  
                {this.state.displayPopup && <InfoPopup userDetails={this.state.userDetails} handleClose={this.closePopup} infoToChange={this.state.infoChange} handleSubmit={this.changeCustomerDetails}/>}
                <h1> Email: {this.state.userDetails.email}  <button onClick={()=>this.displayPopup("Email")}> Change details </button></h1>  
                <h1> Password: {this.state.userDetails.password}  <button onClick={()=>this.displayPopup("Password")}> Change details </button></h1>  
            </div>
        )
}
};

export default SettingsPage;