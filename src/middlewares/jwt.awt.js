import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
 const privateKey = fs.readFileSync(path.resolve('./key'));
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      // console.log("token here is ", token)
      if (token.length <= 0) {
        return res.status(401).send("No token provided!");
      }
    
      jwt.verify(token, Buffer.from(privateKey, 'base64'), (err, user) => {
        if (err) {
          return res.status(403).send("Unauthorized!");
        }
        // console.log("user here us ", user)
        req.user = user;
        next();
      });
  } else {
      return res.status(401);
  }
};