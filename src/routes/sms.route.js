import express from 'express';
import {
    sendsms,
    getUserssms
} from '../controllers/sms.controller';

import { verifyToken } from '../middlewares/jwt.awt';

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post('/send', [verifyToken], sendsms);
router.get('/getsms/:id', [verifyToken], getUserssms);

export default router;
