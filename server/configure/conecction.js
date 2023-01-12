const pgPromise = require("pg-promise");

const config = {
    user: 'qffkfulxbyehhv',
    port: '5432',
    host: 'ec2-52-21-136-176.compute-1.amazonaws.com',
    password: 'd4d89a7a4f9ec850f5d09d5c352ad23a77ce82a5816d9f11461dbb658ece5750',
    database: 'dkbhagitsul2m',
    ssl: {
        rejectUnauthorized: false
    }
};

const pgp = pgPromise({})
const db = pgp(config)
exports.db = db