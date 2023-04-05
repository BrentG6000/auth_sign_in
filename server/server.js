const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const environment = process.env.Node_ENV;

const app = express();

// Parses requests that include URL
app.use(express.urlencoded({ extended: true }));

// Parses requests that include JSON
app.use(express.json());

/* If we're in production, this allows Express to serve the static assets from /client/build. When
the project is built, React places its static assets (JavaScript, CSS, Images, etc.) there in chunk
files for efficiency, so using this directory in production is also more efficent. */
if (environment === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

// Notification of intial connection to MongoDB
db.once('open', () => { 
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`)); 
});

// Notification of each disconnect to MongoDB after intial connection
db.on('disconnected', (error) => {
  console.error('MongoDB connection error: ', error);
});