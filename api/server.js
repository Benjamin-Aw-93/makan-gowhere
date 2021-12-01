const fs = require('fs');
const express = require('express');
const { ApolloServer , UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/usertracker';

let db;

let aboutMessage = "User Tracker API v1.0";

const resolvers = {
  Query:{
    about: () => aboutMessage,
    userList,
    findSpecificUser
  },
  Mutation:{
    setAboutMessage,
    userCreate,
    userDel,
    userAddPreference,
    userEditLat,
    userEditLng,
    updateCustomerName,
    updateCustomerEmail,
    updateCustomerPW
  }
};

function setAboutMessage(_, {message}){
  return aboutMessage = message;
}

async function userList(){
  const users = await db.collection('users').find({}).toArray();
  return users;
}

async function findSpecificUser(_, {specificName}){
  const user = await db.collection('users').findOne({ name: specificName });
  return user;
}

async function updateCustomerName(_, {infoToUpdate, specificName}){
    const results = await db.collection('users').update(
      {name: specificName},
      {
        $set: {name:infoToUpdate}
      }
      );
    const newUser = await db.collection('users').findOne({ name: infoToUpdate });
    return newUser;
  }

  async function updateCustomerPW(_, {infoToUpdate, specificName}){
    const results = await db.collection('users').update(
      {name: specificName},
      {
        $set: {password:infoToUpdate}
      }
      );
    const newUser = await db.collection('users').findOne({ name: specificName });
    return newUser;
  }

  async function updateCustomerEmail(_, {infoToUpdate, specificName}){
    const results = await db.collection('users').update(
      {name: specificName},
      {
        $set: {email:infoToUpdate}
      }
      );
    const newUser = await db.collection('users').findOne({ name: specificName });
    return newUser;
  }

function test_phonenumber(inputtxt){
    const phoneno = /.*@.*.com/;
  
    return inputtxt.match(phoneno)? true : false ;
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

async function userCreate(_, {user}){
  userValidate(user);
  user.created = new Date();

  const result = await db.collection('users').insertOne(user);

  const savedCustomer= await db.collection('users').findOne({ _id: result.insertedId });

  return savedCustomer;
}

async function userDel(_, {id}){

  const savedCustomer = await db.collection('users').findOne({ id: id });

  await db.collection('users').deleteOne({id: id});

  return savedCustomer;
}

async function userAddPreference(_, {id, preference}){

    const savedCustomer = await db.collection('users').findOne({ id: id });

    const preflist = savedCustomer.preferences.push(preference);
  
    await db.collection('users').updateOne({id: id}, {$set: {preferences: preflist }});
  
    return savedCustomer;
  }

async function userEditLat(_, {id, lat}){

    const savedCustomer = await db.collection('users').findOne({ id: id });
  
    await db.collection('users').updateOne({id: id}, {$set: {lat: lat }});
  
    return savedCustomer;
  }

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

