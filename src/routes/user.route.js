import express from 'express';
import {
    signup,
    login,
    getCurrentUser
} from '../controllers/user.controller';

import { verifyToken } from '../middlewares/jwt.awt';

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post('/signup', signup);
router.post('/login', login);
router.get('/loggeduser', [verifyToken], getCurrentUser)

export default router;
