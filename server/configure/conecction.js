const pgPromise = require("pg-promise");

const config = {
    user: 'kwivcczozljign',
    port: '5432',
    host: 'ec2-52-3-60-53.compute-1.amazonaws.com',
    password: '359dd62f344449a3a3f8944271e2e4c01c7a40370aca9fde86008dee84ad8315',
    database: 'dl14lqhvu494n',
    ssl: {
        rejectUnauthorized: false
    }
};

const pgp = pgPromise({})
const db = pgp(config)
exports.db = db
