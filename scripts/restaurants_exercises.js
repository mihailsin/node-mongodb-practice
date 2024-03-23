const { client } = require('../db/clients');
const { printAggregationResult, printResults } = require('../db/utils');

// {
//   "address": {
//      "building": "1007",
//      "coord": [ -73.856077, 40.848447 ],
//      "street": "Morris Park Ave",
//      "zipcode": "10462"
//   },
//   "borough": "Bronx",
//   "cuisine": "Bakery",
//   "grades": [
//      { "date": { "$date": 1393804800000 }, "grade": "A", "score": 2 },
//      { "date": { "$date": 1378857600000 }, "grade": "A", "score": 6 },
//      { "date": { "$date": 1358985600000 }, "grade": "A", "score": 10 },
//      { "date": { "$date": 1322006400000 }, "grade": "A", "score": 9 },
//      { "date": { "$date": 1299715200000 }, "grade": "B", "score": 14 }
//   ],
//   "name": "Morris Park Bake Shop",
//   "restaurant_id": "30075445"
// }

(async () => {
    try {
        let query;
        let pipeline;
        await client.connect();
        const db = client.db('sample_restaurants');
        const restaurants = db.collection('restaurants');

        // Write a MongoDB query to display all the restaurant which is in the borough Bronx.
        // const bronxRests = restaurants.find({ borough: 'Bronx' });
        // await printResults(bronxRests);

        // Write a MongoDB query to display the first 5 restaurant which is in the borough Bronx.
        // const limitedBronxRests = restaurants.find({ borough: 'Bronx' }).limit(5);
        // await printResults(limitedBronxRests);

        // Write a MongoDB query to display the next 5 restaurants after skipping first 5 which are in the borough Bronx
        // const skippedBronxRests = restaurants.find({ borough: 'Bronx' }).skip(5).limit(5);
        // await printResults(skippedBronxRests);

        // Write a MongoDB query to find the restaurants who achieved a score more than 90.
        // const filteredByScore = restaurants.find({ grades: { $elemMatch: { score: { $gt: 90 } } } });
        // await printResults(filteredByScore);

        // Write a MongoDB query to find the restaurants that achieved a score, more than 80 but less than 100.
        // const filteredByScore = restaurants.find({ grades: { $elemMatch: { score: { $gt: 80, $lt: 100 } } } });
        // await printResults(filteredByScore);

        // Write a MongoDB query to find the restaurants which locate in latitude value less than -95.754168.
        // const filteredByScore = restaurants.find({ 'address.coord': { $lt: -95.754168 } });
        // await printResults(filteredByScore);

        // Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a score more than 70 and located in the longitude less than -65.754168. Note : Do this query without using $and operator.
        // const filteredByMultipleFlds = restaurants.find({ cuisine: { $ne: 'American' }, grades: { $elemMatch: { score: { $gt: 70 } } }, 'address.coord': { $lt: -65.754168 } });
        // await printResults(filteredByMultipleFlds);

        // Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a grade point 'A' not belongs to the borough Brooklyn. The document must be displayed according to the cuisine in descending order.
        // const filteredByMultipleFlds = restaurants
        //     .find({ cuisine: { $ne: 'American' }, grades: { $elemMatch: { grade: 'A' } }, borough: { $ne: 'Brooklyn' } })
        //     .sort({ cuisine: -1 });
        // await printResults(filteredByMultipleFlds);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Wil' as first three letters for its name.
        // const nameByRegexPipeline = [
        //     { $match: { name: /^Wil/ } },
        //     {
        //         $project: {
        //             _id: 0,
        //             restaurant_id: 1,
        //             name: 1,
        //             borough: 1,
        //             cuisine: 1,
        //         },
        //     },
        // ];
        // await printAggregationResult(restaurants, nameByRegexPipeline);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'ces' as last three letters for its name.
        // const nameByRegexPipeline = [
        //     { $match: { name: /ces$/ } },
        //     {
        //         $project: {
        //             _id: 0,
        //             restaurant_id: 1,
        //             name: 1,
        //             borough: 1,
        //             cuisine: 1,
        //         },
        //     },
        // ];
        // await printAggregationResult(restaurants, nameByRegexPipeline);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.
        // const nameByRegexPipeline = [
        //     { $match: { name: /Reg/ } },
        //     {
        //         $project: {
        //             _id: 0,
        //             restaurant_id: 1,
        //             name: 1,
        //             borough: 1,
        //             cuisine: 1,
        //         },
        //     },
        // ];
        // await printAggregationResult(restaurants, nameByRegexPipeline);

        // Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.
        // const res = restaurants.find({ borough: 'Bronx', cuisine: { $in: ['American', 'Chinese'] } });
        // await printResults(res);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn.
        // const res = restaurants.find(
        //     { borough: { $in: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] } },
        //     { projection: { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 } },
        // );
        // await printResults(res);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn.
        // const res = restaurants.find(
        //     { borough: { $nin: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] } },
        //     { projection: { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 } },
        // );
        // await printResults(res);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.
        const res = restaurants.find(
            { borough: { $nin: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] }, grades: { $elemMatch: { score: { $lte: 10 } } } },
            { projection: { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 } },
        );
        await printResults(res);
    } catch (error) {
        console.dir(error);
    } finally {
        await client.close();
        process.exit();
    }
})();
