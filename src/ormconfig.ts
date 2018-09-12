import { ConnectionOptions } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { User } from './modules/user';
import { BookmarkEntity } from './modules/bookmark';

const fs = require('fs');
const dotenv = require('dotenv');
const dotenvSafe = require('dotenv-safe');

if (fs.existsSync('.env')) {
    dotenv.config();
    dotenvSafe.config({
        allowEmptyValues: true,
    });
}

const mongo: MongoConnectionOptions = {
    type: 'mongodb',
    host: process.env.TYPEORM_HOST as string,
    port: Number.parseInt(process.env.TYPEORM_PORT as string),
    username: process.env.TYPEORM_USERNAME as string,
    password: process.env.TYPEORM_PASSWORD as string,
    database: process.env.TYPEORM_DATABASE as string,
    entities: [User, BookmarkEntity],
    synchronize: !!process.env.TYPEORM_SYNCHRONIZE,
    logging: !!process.env.TYPEORM_LOGGING,
};

export const config: ConnectionOptions[] = [mongo];  
