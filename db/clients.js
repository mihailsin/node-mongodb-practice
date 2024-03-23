const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const { MONGODB_URI, SQUEEZE_CONSUMERS_MONGODB_URI } = process.env;
const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const consumersClient = new MongoClient(SQUEEZE_CONSUMERS_MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

module.exports = { client, consumersClient };
