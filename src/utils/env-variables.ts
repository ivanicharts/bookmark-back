const fs = require('fs');
const dotenv = require('dotenv');
const dotenvSafe = require('dotenv-safe');

export function initEnvVariables() {
    if (fs.existsSync('.env')) {
        dotenv.config();
        dotenvSafe.config({
            allowEmptyValues: true,
        });
    }
}