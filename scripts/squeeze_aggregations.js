const { consumersClient } = require('../db/clients');
const { printAggregationResult } = require('../db/utils');

const persons = consumersClient.db().collection('persons');

(async () => {
    try {
        let pipeline;
        pipeline = [
            { $match: { 'currentAddress.state': 'FL' } },
            {
                $lookup: {
                    from: 'auto_insurances',
                    localField: 'accountId',
                    foreignField: 'accountId',
                    pipeline: [{ $match: { completedOn: { $exists: true } } }],
                    as: 'insurance',
                },
            },
            { $unwind: '$insurance' },
            { $project: { _id: 0, insurance: 1 } },
        ];

        await printAggregationResult(persons, pipeline);
    } catch (error) {
        console.dir(error);
    } finally {
        await client.close();
    }

    process.exit();
})();
