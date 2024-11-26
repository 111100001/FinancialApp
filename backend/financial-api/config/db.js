// db.js
const { Client } = require('pg');

// Create a new PostgreSQL client
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres', 
  password: '0',  
  database: 'fin', 
});

// Connect to PostgreSQL
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;
