import path from 'path';
import * as winston from 'winston';

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: path.join(__dirname, '/logs/app.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above

const logger = winston.createLogger({
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
  ),
  level: 'info',
  transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'all.log' }),
  ],
});

export default logger;