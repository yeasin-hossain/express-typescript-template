import express from 'express';

const router = express.Router();

import { getHome } from '../controllers/home.controller';

router.get('/', getHome);

export default router;
