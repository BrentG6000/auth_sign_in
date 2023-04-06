const router = require('express').Router();
const {
  createUser,
  deleteUser,
  authenticateLogin,
  lookupUserByToken
} = require('../../controllers/user-controller');

router.route('/').post(createUser);
router.route('/').delete(deleteUser);
router.route('/lookup').get(lookupUserByToken)
router.route("/auth").post(authenticateLogin);

module.exports = router;