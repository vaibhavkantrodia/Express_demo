const router = require("express").Router();
const Controller = require("../controller/user.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.get("/findAllUser", authenticateToken('admin'), Controller.findAllUser);
router.get('/:id', authenticateToken('user'), Controller.findOneUser);
router.put("/:id", authenticateToken('user'), Controller.updateUser);
router.delete("/:id", authenticateToken('user'), Controller.deleteUser);

module.exports = router;