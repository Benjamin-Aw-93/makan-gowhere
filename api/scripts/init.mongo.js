db.users.remove({});

const initalusersDB = [
    {
      name: 'Main User', email: 'a@hotmail.com', password: 'a', lat: 0, 
      lng: 0, cusine: "chinese", current: true
    },
    {
      name: 'Ben', email: 'ben@hotmail.com', password: 'B', lat: 1.3177661709250725, 
      lng: 103.7562537974075, cusine: "chinese", current: false
    },
    {
      name: 'Mary', email: 'mary@hotmail.com', password: 'M', lat: 1.3223997979522544, 
      lng: 103.77951391387145, cusine: "local", current: false
    },
    {
      name: 'Sebas', email: 'sebas@hotmail.com', password: 'S', lat: 1.302535206324993, 
      lng: 103.7786126919333, cusine: "western", current: false
    },
  ];

db.users.insertMany(initalusersDB);

const count = db.users.count();

print('Inserted', count, 'customers');

db.users.createIndex({ name: 1 });
db.users.createIndex({ email: 1 }, { unique: true });