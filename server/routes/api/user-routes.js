const router = require("express").Router();
const {
  createUser,
  signoutUser,
  deleteUser,
  lookupUserByToken,
  authenticateLogin,
  changePassword
} = require('../../controllers/user-controller');

router.route('/signup').post(createUser);
router.route('/signout').post(signoutUser);
router.route('/delete').delete(deleteUser);
router.route('/lookup').get(lookupUserByToken);
router.route("/auth").post(authenticateLogin);
router.route("/changePassword").update(changePassword);

module.exports = router;