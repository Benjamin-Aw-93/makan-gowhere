import React from "react";
import Grid from '@mui/material/Grid';
import { Paper, Avatar, TextField, Button } from "@material-ui/core";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

/*
Component that the user will first see, even before the homepage.
Acts as a simple form of authentication. 
*/

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: 20,
  height: '70vh',
  width: 280,
  margin: '20px auto',
}));

function LoginForm({Login, error}) {

  const [details,setDetails] = React.useState({name:"", email:"", password:""});

    const submitHandler = e => {
      e.preventDefault();
      Login(details);
    }
    
    // The goal is to create a form to take in all the user's details. If it does not match, we throw out an error, which will infom the user than a wrong password has been entered. 

    return (
      <Grid >
        <StyledPaper elevation = {10}>
          <Grid align = 'center'>
            <StyledAvatar>
              <PersonOutlineOutlinedIcon/>
            </StyledAvatar>
            <h2> Welcome to Makan GoWhere! </h2>
            <h3> Login </h3>
            {(error !== "") ? <Alert severity="error" color = "error">{error}</Alert> : ""} 
          </Grid>
          <Grid>
            <TextField label = 'Name' placeholder = "Enter name" type = "text" onChange={e=>setDetails({...details, name:e.target.value})} value={details.name} fullWidth required/>
            <TextField label = 'Email' placeholder = "Enter username" type = "email" onChange={e=>setDetails({...details, email:e.target.value})} value={details.email} fullWidth required/>
            <TextField label = 'Password' placeholder = "Enter password" type = "password" onChange={e=>setDetails({...details, password:e.target.value})} value={details.password} fullWidth required/>
          </Grid>
          <Grid sx = {{ mt: 2}}>
            <Button type = 'submit' color = 'primary' variant = 'contained' onClick={submitHandler} fullWidth>Sign In</Button>
          </Grid>
        </StyledPaper>
      </Grid>

    );
};

export default LoginForm;