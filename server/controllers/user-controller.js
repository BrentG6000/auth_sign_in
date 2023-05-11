const User = require("../models/User");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const bcrypt = require("bcrypt");

// This method sets the variables in .env to process.env
require("dotenv").config();

const createUser = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser === null) {
      /* createRequest will be a WriteResult object that contains the status of the create (save in
      mongoDB) operation after the promise is complete. */
      const createRequest = await User.create(req.body);
      /* Sends a response back to the client. .json is an Express method that sets the Content-Type
      to application / json.The response body will contain the JSON version of createRequest. */
      res.status(200).json(createRequest);
    }
    else {
      throw "Email already used";
    }
  } catch (error) {
    res.status(400).json({ message: 'Unable to create user' });
  }
};

const signoutUser = async (req, res) => {
  try {
    const user = await lookupUserByToken(req);
    if (typeof user === "string") {
      res.status(500).json({ message: lookUp });
    }
    user.tokenVersion += 1;
    await user.save();
    res.status(200).json({ result: "Token invalidated" });
  } catch (err) {
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
    // Now compare the supplied password w/ the hashed password
    const isValid = await bcrypt.compare(req.body.password, foundUser.password); // Password is coming up invalid
    if (!isValid) {
      return res.status(401).json({ message: "Login failed." })
    }

  /* creates password constant and modifiedUser object with everything from foundUser object except
  password */
    const { password, ...modifiedUser } = foundUser;

  // Create a token to represent the authenticated user
    const payload = {_id: modifiedUser._doc._id, email: modifiedUser._doc.email,
      tokenVersion: modifiedUser._doc.tokenVersion}

    const token = jwt.sign(
      { payload },
      process.env.JWT_SECRET, { expiresIn: "1h" }
   );

  res
    .status(200)
    .set({ "auth-token": token }) // sets custom header
    .json({ result: "success", fname: modifiedUser._doc.fname, lname: modifiedUser._doc.lname , token: token});
  } catch (error) {
    res.status(401).json({ message: "User not found." });
  }
};

// const lookupUserByToken = async (req, res) => {
//   if (!req.headers || !req.headers.cookie) {
//     return res.status(401).json({ msg: "Unauthorized" });
//   }

//   // The node package named cookie will parse cookies for us
//   const cookies = cookie.parse(req.headers.cookie);

//   // Get the token from the request headers & decode it 
//   const token = cookies["auth-token"]  //cookies.authToken
//   if (!token) {
//     return res.status(401).json({ msg: "Unauthorized" });
//   }
//   //console.log(`Token received by server from client: ${token}`);
//   //const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//   jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//     if (err) {
//       //console.log(err);
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     try {
//       const user = await User.findById(decodedToken.payload._id);
//       if (decodedToken.payload.tokenVersion !== user.tokenVersion) {
//         return res.status(401).json({ message: "Unauthorized" });
//       }
//       return res.status(200).json({ result: "success", fname: user.fname, lname: user.lname });
//     } catch (error) {
//       //console.log(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
// }

const lookupUserByToken = async (req) => {
  return new Promise((resolve, reject) => {
  if (!req.headers || !req.headers.cookie) {
    return resolve("Unauthorized");
  }

  // The node package named cookie will parse cookies for us
  const cookies = cookie.parse(req.headers.cookie);

  // Get the token from the request headers & decode it 
  const token = cookies["auth-token"]  //cookies.authToken
  if (!token) {
    return resolve("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return resolve("Forbidden");
    }

    try {
      const user = await User.findById(decodedToken.payload._id);
      if (decodedToken.payload.tokenVersion == user.tokenVersion) {
        return resolve(user);
      }
    } catch (error) {
      return resolve("Internal Server Error");
    }
  });
});
}

const authenticateStatus = async (req, res) => {
    const user = await lookupUserByToken(req);
    
    switch (user) {
      case "Unauthorized":
        return res.status(401).json({ msg: "Unauthorized" });
        break;
      case "Forbidden":
        return res.status(403).json({ message: "Forbidden" });
        break;
      case "Internal Server Error":
        return res.status(500).json({ message: "Internal Server Error" });
        break;
      default:
        return res.status(200).json({ result: "success", fname: user.fname, lname: user.lname });
    }
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
  authenticateLogin,
  authenticateStatus,
  changePassword
}