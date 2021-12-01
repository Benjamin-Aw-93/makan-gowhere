const fs = require('fs');
const express = require('express');
const { ApolloServer , UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

/* 
MongoDB set up to create a database of user's friends
We initailly set up the database with different functionalities put in place. 
Most of it are currently un-used by the app but can be easily intergreated with the front end if necessary. 
Now the DB is only used for querying
*/
const url = 'mongodb://localhost/usertracker';

let db;

let aboutMessage = "User Tracker API v1.0";

const resolvers = {
  Query:{
    about: () => aboutMessage,
    userList,
  },
  Mutation:{
    setAboutMessage,
    userCreate,
    userDel,
    userAddPreference,
    userEditLat,
    userEditLng,
  }
};

function setAboutMessage(_, {message}){
  return aboutMessage = message;
}

// Get list of user 
async function userList(){
  const users = await db.collection('users').find({}).toArray();
  return users;
}

// Checking user input email 
function test_email(inputtxt){
    const email = /.*@.*.com/;
  
    return inputtxt.match(email)? true : false ;
  }
  
function userValidate(user) {
  const errors = [];
  
  if (user.name.length <= 0) {
    errors.push('Field "Name" must be at least 1 characters long.');
  }
  if (user.email.length <= 0  || !test_email(user.email)) {
    errors.push('Field "Email" is required and must be valid"');
  }
  if (user.name.password <= 0) {
    errors.push('Field "Password" must be at least 1 characters long.');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}


// Creating a new user in the database
async function userCreate(_, {user}){
  userValidate(user);
  user.created = new Date();

  const result = await db.collection('users').insertOne(user);

  const savedCustomer= await db.collection('users').findOne({ _id: result.insertedId });

  return savedCustomer;
}

// Deleting user in the database
async function userDel(_, {id}){

  const savedCustomer = await db.collection('users').findOne({ id: id });

  await db.collection('users').deleteOne({id: id});

  return savedCustomer;
}

// Adding a users preference based on the ID
async function userAddPreference(_, {id, preference}){

    const savedCustomer = await db.collection('users').findOne({ id: id });

    const preflist = savedCustomer.preferences.push(preference);
  
    await db.collection('users').updateOne({id: id}, {$set: {preferences: preflist }});
  
    return savedCustomer;
  }

// Editing a users position (lat)
async function userEditLat(_, {id, lat}){

    const savedCustomer = await db.collection('users').findOne({ id: id });
  
    await db.collection('users').updateOne({id: id}, {$set: {lat: lat }});
  
    return savedCustomer;
  }

// Editing a users position (lng)
async function userEditLng(_, {id, long}){

    const savedCustomer = await db.collection('users').findOne({ id: id });
  
    await db.collection('users').updateOne({id: id}, {$set: {long: long }});
  
    return savedCustomer;
  }

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

server.applyMiddleware({ app, path: '/graphql' });


(async function () {
  try {
    await connectToDb();
    app.listen(5000, function () {
      console.log('API server started on port 5000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();

