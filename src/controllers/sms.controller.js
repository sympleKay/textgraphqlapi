import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { client } from '../utils/client.util';
import { SMS_API_KEY, SMS_HOST } from '../utils/constant';
import { User } from '../models/user.model';
import { Sms } from '../models/sms.model'
import logger from '../utils/logger.util';

// The Sender ID is a maximum of 11 Characters.
// The 'to' parameter can be in any of these formats 07037770033, 2347037770033, +2347037770033, +23407037770033.
// You can also pass multiple destinations by separating each of the number with a comma. (e.g. 07037770033,09050030090)
// For More	


export const sendsms = async (req, res) => {
    try {
        if (!req.user) return res.status(403).send('You need to be logged in');
        const { to, sender, body, apikey} = req.body.args;
        const recipient = to.toString();
        
        if (!to || !sender || !body || !apikey) return res.status(400).send('All fileds are required');
        if (req.user.apikey !== apikey) return res.status(403).send('Invalid API key');

        const { data } = await axios.post(`${SMS_HOST}api_token=${SMS_API_KEY}&from=${sender}&to=${recipient}&body=${body}`);

        if (data.data.status === 'success' && data.data.message === 'Message Sent') {
            const newSms = new Sms ({
                senderName: sender,
                to,
                message: body,
                user: req.user.id,
                messageid: data.data.message_id
            })
            const saved = await newSms.save();
            if (saved) return res.status(200).send(data.data.message);
        };

    } catch (error) {
        console.log(error);
        logger.error(`sms.controller->sendsms --> ${error}`);
        return res.status(500).send(error);
    }
}


export const getUserssms = async (req, res) => {
    try {
        if (!req.user) return res.status(403).send('You need to be logged in');
        const { id } = req.params;
        if (req.user.id !== id) return res.status(403).send('Authorized Access');
        const userMsg = await Sms.find({user: id});
        if (userMsg) {
            res.status(200).send(userMsg);
        } else {
            return res.status(404).send('No record of message found');
        }

        
    } catch (error) {
        console.log(error);
        logger.error(`sms.controller->getusersms --> ${error}`);
        return res.status(500).send(error);
    }
}