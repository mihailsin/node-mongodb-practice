async function printAggregationResult(collection, pipeline) {
    const cursor = collection.aggregate(pipeline);

    for await (const doc of cursor) {
        console.dir(doc);
    }
}

async function printResults(cursor) {
    for await (const doc of cursor) {
        console.dir(doc);
    }
}

module.exports = { printAggregationResult, printResults };
