const router = require("express").Router();
const {
  createUser,
  signoutUser,
  deleteUser,
  authenticateLogin,
  authenticateStatus,
  changePassword
} = require('../../controllers/user-controller');

router.route('/signup').post(createUser);
router.route('/signout').post(signoutUser);
router.route('/delete').delete(deleteUser);
router.route('/authStatus').get(authenticateStatus,);
router.route("/auth").post(authenticateLogin);
router.route("/changePassword").post(changePassword);

module.exports = router;