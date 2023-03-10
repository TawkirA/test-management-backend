import express from 'express';
import { addTest, getAllTest } from '../controllers/testController.js';
const router = express.Router();

router.route('/add-test').post(addTest);
router.route('/').get(getAllTest);

export default router;