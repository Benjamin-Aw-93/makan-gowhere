import React, { Component, useState } from 'react';
import Select from "react-select";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";

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

const defaultFormTemplate = { userName:"", cuisine:"", location:"" };
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

function FriendsPage() {
    const classes = useStyles();

    const [inputFields, setInputFields] = useState([{ userName:"Admin User", cuisine:"", location:"" }]);

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); //prevent page from reloading
        console.log(inputFields);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, defaultFormTemplate]);
    };

    const handleRemoveFields = (index) => {
        const values = [... inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const handleSelectCuisine = (event,index) => {
        const values = [...inputFields];
        let cuisineSelected = (Array.isArray(event)?event.map(x=>x.label):[]);
        values[index]["cuisine"] = cuisineSelected;
        setInputFields(values);
    };

    return (
        <Container style={{"margin": "auto","width": "50%","padding":"10px"}}>
            <h1> Let the fun begin! </h1>
            <form className={classes.root} onSubmit={handleSubmit}>
                { inputFields.map((inputField,index) => (
                    <div key={index}>
                        <TextField 
                            name='userName'
                            label="Your Name"
                            variant="filled"
                            value={inputField.userName}
                            onChange={ event => handleChangeInput(index,event) }
                            />
                        <TextField 
                            name = 'location'
                            label = "Location"
                            variant="filled"
                            value={inputField.location}
                            onChange={ event => handleChangeInput(index,event) }
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
                <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    onClick={handleSubmit}
                >Find a place for us :) </Button>
            </form>
        </Container>
    );
};
 
export default FriendsPage;
