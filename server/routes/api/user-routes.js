const router = require("express").Router();
const {
  createUser,
  deleteUser
  authenticateLogin,
  changePassword
} = require('../../controllers/user-controller');

router.route('/').post(createUser);
router.route('/').delete(deleteUser);
router.route('/lookup').get(lookupUserByToken);
router.route("/auth").post(authenticateLogin);
router.route("/changePassword").update(updatePassword);

module.exports = router;