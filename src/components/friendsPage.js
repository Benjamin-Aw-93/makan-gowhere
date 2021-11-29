import React, { useState } from 'react';
import Select from "react-select";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Link} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1)
        }
    },
    button: {
        margin: theme.spacing(1)
    }
}));

const cuisineList = [
    {
        value:1,
        label:'Local'
    },
    {
        value:2,
        label:'Chinese'
    },
    {
        value:3,
        label:'Western'
    }
];

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        padding: 20,
        zIndex: 1
    }),
    
    control: (_, { selectProps: { width }}) => ({
        width: width
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
};

function FriendsPage({friends, setFriends, updateCoordinates}) {

    const [submitted, setSubmitted] = React.useState(false);

    const classes = useStyles();

    const handleChangeInput = (index, event) => {
        const values = [...friends];
        values[index][event.target.name] = event.target.value;
        setFriends(values);
        setSubmitted(false);
    };

    const handleNumericChangeInput = (index, event) => {
        const values = [...friends];
        values[index][event.target.name] = parseFloat(event.target.value);
        setFriends(values);
        setSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); //prevent page from reloading
        console.log(friends);
    }

    const handleAddFields = () => {
        setFriends([...friends, { name:"", cuisine:"", lat:"", lng: ""}]);
        setSubmitted(false);
    };

    const handleRemoveFields = (event, index) => {
        const values = [...friends];
        values.splice(index-1, 1);
        setFriends(values);
        setSubmitted(false);
    };

    const handleSelectCuisine = (event,index) => {
        const values = [...friends];
        let cuisineSelected = (Array.isArray(event)?event.map(x=>x.label):[]);
        values[index]["cuisine"] = cuisineSelected;
        setFriends(values);
        setSubmitted(false);
    };

    return (
        <Container style={{"margin": "auto","width": "50%","padding":"10px"}}>
            <h1> Let the fun begin! </h1>
            <form className={classes.root} onSubmit={handleSubmit}>
                { friends.map((inputField,index) => (
                    <div key={index}>
                        <TextField 
                            name='name'
                            label="Your Name"
                            variant="filled"
                            value={inputField.name}
                            onChange={ event => handleChangeInput(index,event) }
                            />
                        <TextField 
                            name = 'lat'
                            label = "Lat"
                            variant="filled" 
                            value={inputField.lat}
                            onChange={ event => handleNumericChangeInput(index,event) }
                        />
                        <TextField 
                            name = 'lng'
                            label = "Lng"
                            variant="filled"
                            value={inputField.lng}
                            onChange={ event => handleNumericChangeInput(index,event) }
                        />
                        <IconButton onClick={event => handleRemoveFields(event,index)}>
                            <RemoveIcon />
                        </IconButton>
                        <Select 
                            isMulti
                            name="cuisine" 
                            styles={customStyles}
                            options={cuisineList}
                            onChange={event => handleSelectCuisine(event,index)}
                        >
                        </Select>
                        
                    </div>
                )) }
                <IconButton onClick={handleAddFields}> Add Friends</IconButton>
                {submitted ? (
                    <Button 
                        className={classes.button}
                        variant="contained" 
                        buttonStyle="btn--outline"
                        type="submit"
                    > <CheckCircleIcon color = "success"/> Friend listing confirmed! </Button>
                ) : (
                    <Button 
                        className={classes.button}
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        onClick={() => { setFriends(friends);  setSubmitted(true)}}
                    > Confirm friends listing? </Button>
                )}
                <Button 
                    component={Link}
                    to={"/maps"}
                    className={classes.button}
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    onClick={updateCoordinates}
                >Find a place for us :) </Button>
            </form>
        </Container>
    );
};
 
export default FriendsPage;
