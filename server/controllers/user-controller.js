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

const signoutUser = async (req, res) => {
  try {
    const user = req.user;
    user.tokenVersion += 1;
    await user.save();
    res.status(200).json({ message: "Token invalidated" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteRequest = await User.deleteOne(req.body);
    res.status(200).json(deleteRequest);
  } catch (error) {
    res.status(400).json({ message: 'Unable to delete user' });
  }
};

const authenticateLogin = async (req, res) => {
  // First see if we have a user with the supplied email address 
  try {
    const foundUser = await User.findOne({ email: req.body.email });
  } catch (error) {
    res.status(401).json({ message: "User not found." });
  }

  // Now compare the supplied password w/ the hashed password
  const isValid = await bcrypt.compare(req.body.password, foundUser.password)
  if (!isValid) {
    return res.status(401).json({ message: "Login failed." })
  }

  /* creates password constant and modifiedUser object with everything from foundUser object except
  password */
  const { password, ...modifiedUser } = foundUser;

  // Create a token to represent the authenticated user
  const token = jwt.sign(
    { _id: modifiedUser._id, email: modifiedUser.email, tokenVersion: modifiedUser.tokenVersion },
    process.env.JWT_SECRET, { expiresIn: "1h" }
  );

  res
    .status(200)
    .set({ "auth-token": token }) // sets custom header
    .json({ result: "success", user: modifiedUser, token: token });
};

const lookupUserByToken = async (req, res) => {
  if (!req.headers || !req.headers.cookie) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  // The node package named cookie will parse cookies for us
  const cookies = cookie.parse(req.headers.cookie);

  // Get the token from the request headers & decode it 
  const token = cookies["auth-token"]  //cookies.authToken
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  
  //const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const user = await User.findById(decodedToken._id);

      if (decodedToken.tokenVersion !== user.tokenVersion) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return res.status(200).json({ result: "success", fname: user.fname, lname: user.lname });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  
}

const changePassword = async (req, res) => {
  // Find user in the database. No need for try/catch since the user will already be logged in.
  const foundUser = await User.findOne({ email: req.body.email });
  
  if (!req.body.newPassword) {
    return res.status(404).json({ msg: "New password not found." });
  }
  else if (req.body.newPassword.length() < 8) {
    return res.status(400).json({ msg: "New password is less than 8 characters long" });
  }
  else if (req.body.newPassword == foundUser.password) {
    return res.status(400).json({ msg: "Password cannont be the same as previously used password" });
  }
  else {
    foundUser.password = req.body.newPassword;
    try {
      await foundUser.save();
    }
    catch (error) {
      res.status(404).json({ msg: "Unable to save new password." });
    }
  }
}

module.exports = { 
  createUser,
  signoutUser,
  deleteUser,
  lookupUserByToken,
  authenticateLogin,
  changePassword
}