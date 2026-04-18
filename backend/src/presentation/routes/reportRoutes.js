const express = require('express');
const ReportController = require('../controllers/ReportController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authMiddleware, roleMiddleware(['librarian']));

router.get('/overdue', ReportController.getOverdueBooks);
router.get('/popular', ReportController.getPopularBooks);
router.get('/user-history/:userId', ReportController.getUserHistory);
router.get('/inventory', ReportController.getInventorySummary);

module.exports = router;
