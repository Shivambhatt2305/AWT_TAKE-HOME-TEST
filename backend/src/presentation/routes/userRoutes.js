const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// All user management routes restricted to librarian
router.use(authMiddleware, roleMiddleware(['librarian']));

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
