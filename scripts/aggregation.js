const client = require('../db/client');
async function run() {
    try {
        await client.connect();
        const db = client.db('sample_analytics');
        const accounts = db.collection('accounts');
        const doc = await accounts.findOne({ account_id: 904260 });
        console.log(doc);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
