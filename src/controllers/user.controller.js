import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import logger from '../utils/logger.util';

// const privateKey = fs.readFileSync(path.resolve('../jwt-key'));



export const signup = async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body.args;

    if (!username || !email || !phoneNumber || !password) return res.status(400).send('All fields are required');

    const salt = await bcrypt.genSalt(10);

    const user = new User ({
      username,
      email,
      phoneNumber,
      password: await bcrypt.hash(password, salt),
      apikey: salt
    });

    const saved = await user.save();

    if (saved) return res.status(201).send('User was registered successfully!');
    else
      return res
        .status(500)
        .send('Something strange happened, please try again.');
  } catch (error) {
    console.log(error);
    logger.error(`user.controller->signup --> ${error}`);
    if (error.code === 11000)
      return res
        .status(500)
        .send('Duplicate Error: This username already exists');
    else return res.status(500).send(error);
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body.args;
  
  User.findOne({ email })
    .exec( async(err, user) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!user) {
        return res.status(401).send('Invalid Credentials!');
      }
      
      const passwordIsValid = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send('Invalid password!');
      }
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          apikey: user.apikey
        },
        Buffer.from(privateKey, 'base64'),
        { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 }
      );

      res.status(200).send({
        id: user._id,
        email: user.email || null,
        username: user.username || null,
        phoneNumber: user.phoneNumber || null,
        apikey: user.apikey || null,
        accessToken: token,
      });
    });
};


export const getCurrentUser = (req, res) => {
  // console.log("user id is ", req.user.id);
  User.findOne({ _id: req.user.id })
      .exec((err, user) => {
        // console.log("user here is ", user)
        if(err) {
          return res.status(500).send(err);
        }
        if(user) {
          return res.status(200).send(user);
        } else {
          return res.status(404).send("User does not exist");
        }
      })
};