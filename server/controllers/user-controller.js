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

const authenticateLogin = async (req, res) => {
  // First see if we have a user with the supplied email address 
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) return res.status(401).json({ message: "Login failed." });

  // Now compare the supplied password w/ the hashed password
  const isValid = await bcrypt.compare(req.body.password, foundUser.password)
  if (!isValid) return res.status(401).json({ message: "Login failed." })

  /* creates password constant and modifiedUser object with everything from foundUser object except
  password */
  const { password, ...modifiedUser } = foundUser;

  // Create a token to represent the authenticated user
  const token = jwt.sign({ _id: modifiedUser._id, email: modifiedUser.email }, process.env.JWT_SECRET);

  res
    .status(200)
    .set({ "auth-token": token }) // sets custom header
    .json({ result: "success", user: modifiedUser, token: token })
}

module.exports = { 
  createUser,
  deleteUser,
  authenticateLogin
}