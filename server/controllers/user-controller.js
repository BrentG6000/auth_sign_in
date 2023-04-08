const User = require("../models/User");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const bcrypt = require("bcrypt");

// This method sets the variables in .env to process.env
require("dotenv").config();

const createUser = async (req, res) => {
  try {
    /* createRequest will be a WriteResult object that contains the status of the create (save in
    mongoDB) operation after the promise is complete. */
    const createRequest = await User.create(req.body);
    /* Sends a response back to the client. .json is an Express method that sets the Content-Type
    to application / json.The response body will contain the JSON version of createRequest. */
    res.status(200).json(createRequest);
  } catch (error) {
    res.status(400).json({ message: 'Unable to create user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteRequest = await User.deleteOne(req.body);
    res.status(200).json(deleteRequest);
  } catch (error) {
    res.status(400).json({ message: 'Unable to delete user' });
  }
}

module.exports = { 
  createUser,
  deleteUser
}