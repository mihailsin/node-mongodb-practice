const client = require('../db/client');

async function printAggregationResult(collection, pipeline) {
    const cursor = collection.aggregate(pipeline);

    for await (const doc of cursor) {
        console.dir(doc);
    }
}
async function run() {
    try {
        await client.connect();
        const db = client.db('sample_analytics');
        const accounts = db.collection('accounts');
        const customers = db.collection('customers');
        const transactions = db.collection('transactions');

        const db1 = client.db('sample_airbnb');
        const listingsAndReviews = db1.collection('listingsAndReviews');

        let pipeline;
        // --------------------------- $group

        // will select documents with distinct '$transaction_count' values
        // pipeline = [{ $group: { _id: '$transaction_count' } }];
        // await printAggregationResult(transactions, pipeline);

        // will select documents with distinct '$transaction_count' - '$account_id' values
        // pipeline = [{ $group: { _id: { transaction_count: '$transaction_count', account_id: '$account_id' } } }];
        // await printAggregationResult(transactions, pipeline);

        // ----------------------------$count

        // will count all documents in collection, since there is no any filter applied
        // pipeline = [{ $count: 'allDocuments' }]; // value will become a key in the result object
        // await printAggregationResult(transactions, pipeline);

        // will count filtered and grouped documents
        // pipeline = [{ $match: { transaction_count: { $gt: 20 } } }, { $group: { _id: '$transaction_count' } }, { $count: 'resultsCount' }];
        // await printAggregationResult(transactions, pipeline);

        // -----------------------------$sort
        // -1 - desc; 1 - asc;

        // pipeline = [{ $match: { transaction_count: { $gt: 20 } } }, { $group: { _id: '$transaction_count' } }, { $sort: { _id: -1 } }]; // desc
        // await printAggregationResult(transactions, pipeline);

        // pipeline = [
        //     { $match: { transaction_count: { $gt: 20 } } },
        //     { $group: { _id: { transaction_count: '$transaction_count', account_id: '$account_id' } } },
        //     { $sort: { '_id.transaction_count': -1, '_id.account_id': -1 } },
        // ];
        // await printAggregationResult(transactions, pipeline);

        // -----------------------------$project

        // pipeline = [{ $match: { transaction_count: { $gt: 20, $ne: 50 } } }, { $sort: { transaction_count: -1 } }, { $project: { _id: 0, transaction_count: 1 } }];
        // await printAggregationResult(transactions, pipeline);

        // if all fields in $project stage excluded all fields which are omitted in $project stage will be returned
        // pipeline = [{ $match: { transaction_count: { $gt: 50, $ne: 64 } } }, { $sort: { transaction_count: 1 } }, { $project: { _id: 0, transactions: 0 } }];
        // await printAggregationResult(transactions, pipeline);

        // we can rename fields using {$project : {newFieldName: '$fieldReference'}};
        // pipeline = [
        //     { $match: { transaction_count: { $gt: 50, $ne: 64 } } },
        //     { $sort: { transaction_count: 1 } },
        //     { $project: { aid: '$account_id', transaction_count: 1, bucket_start_date: 1 } },
        // ];
        // await printAggregationResult(transactions, pipeline);

        // change structure of the documents

        // pipeline = [
        //     { $match: { transaction_count: { $gt: 50, $ne: 64 } } },
        //     { $sort: { transaction_count: -1 } },
        //     {
        //         $project: {
        //             _id: 0,
        //             aid: '$account_id',
        //             transaction_count: 1,
        //             datesInfo: {
        //                 startDate: '$bucket_start_date',
        //                 endDate: '$bucket_end_date',
        //             },
        //         },
        //     },
        // ];
        // await printAggregationResult(transactions, pipeline);

        //------------------------------------$limit
        // pipeline.push({ $limit: 3 });
        // await printAggregationResult(transactions, pipeline);

        //------------------------------------$unwind

        // each document will contain one value from 'products' array;
        // pipeline = [{ $unwind: '$products' }];
        // await printAggregationResult(accounts, pipeline);

        // pipeline = [{ $unwind: '$products' }, { $group: { _id: '$products' } }];
        // await printAggregationResult(accounts, pipeline);

        // ---------------------------------accumulators
        // count quantity of grouped documents
        // pipeline = [{ $match: { transaction_count: { $lt: 20 } } }, { $group: { _id: '$transaction_count', count: { $sum: 1 } } }, { $sort: { _id: -1 } }];
        // await printAggregationResult(transactions, pipeline);

        // pipeline = [{ $unwind: '$products' }, { $group: { _id: '$products', count: { $sum: 1 } } }];
        // await printAggregationResult(accounts, pipeline);

        pipeline = [{ $group: { _id: '$bedrooms', count: { $sum: 1 }, averageBeds: { $avg: '$beds' } } }, { $sort: { _id: -1 } }];
        await printAggregationResult(listingsAndReviews, pipeline);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
