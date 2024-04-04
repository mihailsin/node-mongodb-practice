const { client } = require('../db/clients');
const { printAggregationResult, printResults } = require('../db/utils');

// https://www.w3resource.com/mongodb-exercises/#MongoDB_restaurants
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
        let cursor;
        let pipeline;
        let count;
        await client.connect();
        const db = client.db('sample_restaurants');
        const restaurants = db.collection('restaurants');

        // Write a MongoDB query to display all the restaurant which is in the borough Bronx.
        // cursor = restaurants.find({ borough: 'Bronx' });
        // await printResults(cursor);

        // Write a MongoDB query to display the first 5 restaurant which is in the borough Bronx.
        // cursor = restaurants.find({ borough: 'Bronx' }).limit(5);
        // await printResults(cursor);

        // Write a MongoDB query to display the next 5 restaurants after skipping first 5 which are in the borough Bronx
        // cursor = restaurants.find({ borough: 'Bronx' }).skip(5).limit(5);
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants who achieved a score more than 90.
        // cursor = restaurants.find({ grades: { $elemMatch: { score: { $gt: 90 } } } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that achieved a score, more than 80 but less than 100.
        // cursor = restaurants.find({ grades: { $elemMatch: { score: { $gt: 80, $lt: 100 } } } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants which locate in latitude value less than -95.754168.
        // cursor = restaurants.find({ 'address.coord': { $lt: -95.754168 } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a score more than 70 and located in the longitude less than -65.754168. Note : Do this query without using $and operator.
        // cursor = restaurants.find({ cuisine: { $ne: 'American' }, grades: { $elemMatch: { score: { $gt: 70 } } }, 'address.coord': { $lt: -65.754168 } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a grade point 'A' not belongs to the borough Brooklyn. The document must be displayed according to the cuisine in descending order.
        // cursor = restaurants
        //     .find({ cuisine: { $ne: 'American' }, grades: { $elemMatch: { grade: 'A' } }, borough: { $ne: 'Brooklyn' } })
        //     .sort({ cuisine: -1 });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Wil' as first three letters for its name.
        // pipeline = [
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
        // await printAggregationResult(restaurants, pipeline);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'ces' as last three letters for its name.
        // pipeline = [
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
        // await printAggregationResult(restaurants, pipeline);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.
        // pipeline = [
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
        // await printAggregationResult(restaurants, pipeline);

        // Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.
        // cursor = restaurants.find({ borough: 'Bronx', cuisine: { $in: ['American', 'Chinese'] } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn.
        // cursor = restaurants.find(
        //     { borough: { $in: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] } },
        //     { projection: { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 } },
        // );
        // await printResults(rcursores);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn.
        // cursor = restaurants.find(
        //     { borough: { $nin: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] } },
        //     { projection: { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 } },
        // );
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.
        // cursor = restaurants.find(
        //     { borough: { $nin: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn'] }, grades: { $elemMatch: { score: { $lte: 10 } } } },
        //     { projection: { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 } },
        // );
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.
        // cursor = restaurants.find(
        //     { $or: [{ cuisine: { $nin: ['American', 'Chinese'] } }, { name: /^Wil/ }] },
        //     { projection: { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 } },
        // );
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates..
        // cursor = restaurants.find(
        //     { grades: { $elemMatch: { score: 11, grade: 'A', date: new Date('2014-08-11T00:00:00Z') } } },
        //     { projection: { _id: 0, restaurant_id: 1, name: 1, grades: 1 } },
        // );
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".
        // cursor = restaurants.find(
        //     { 'grades.1.score': 9, 'grades.1.grade': 'A', 'grades.1.date': new Date('2014-08-11T00:00:00Z') },
        //     { projection: { _id: 0, restaurant_id: 1, name: 1, grades: 1 } },
        // );
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52..
        // cursor = restaurants.find({ 'address.coord.1': { $gt: 42, $lte: 52 } }, { projection: { _id: 0, restaurant_id: 1, name: 1, grades: 1, address: 1 } });
        // await printResults(cursor);

        // Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.
        // cursor = restaurants.find({}).sort({ name: 1 });
        // await printResults(cursor);

        // Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.
        // cursor = restaurants.find({}).sort({ name: -1 });
        // await printResults(cursor);

        // Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.
        // cursor = restaurants.find({}).sort({ cuisine: 1, borough: -1 });
        // await printResults(cursor);

        // Write a MongoDB query to know whether all the addresses contains the street or not.
        // count = await restaurants.find({ 'address.street': { $exists: true } }).count();
        // console.dir(count);
        // count = await restaurants.find({ 'address.street': { $exists: false } }).count();
        // console.dir(count);

        // Write a MongoDB query which will select all documents in the restaurants collection where the coord field value is Double
        // cursor = restaurants.find({ 'address.coord': { $type: 1 } }); // 1 - double, 2 - string, 3 - object...
        // await printResults(cursor);

        // Write a MongoDB query which will select the restaurant Id, name and grades for those restaurants which returns 0 as a remainder after dividing the score by 7.
        // cursor = restaurants.find({ 'grades.score': { $mod: [7, 0] } }, { projection: { _id: 0, restaurant_id: 1, name: 1, grades: 1 } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurant name, borough, longitude and attitude and cuisine for those restaurants which contains 'mon' as three letters somewhere in its name.
        // cursor = restaurants.find({ name: /mon/ }, { projection: { _id: 0, name: 1, borough: 1, 'address.coord': 1, cuisine: 1 } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurant name, borough, longitude and latitude and cuisine for those restaurants which contain 'Mad' as first three letters of its name.
        // cursor = restaurants.find({ name: /^Mad/ }, { projection: { _id: 0, name: 1, borough: 1, 'address.coord': 1, cuisine: 1 } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5.
        // cursor = restaurants.find({ 'grades.score': { $lt: 5 } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan.
        // cursor = restaurants.find({ borough: 'Manhattan', 'grades.score': { $lt: 5 } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn.
        // cursor = restaurants.find({ borough: { $in: ['Manhattan', 'Brooklyn'] }, 'grades.score': { $lt: 5 } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
        // cursor = restaurants.find({ borough: { $in: ['Manhattan', 'Brooklyn'] }, cuisine: { $ne: 'American' }, 'grades.score': { $lt: 5 } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
        // cursor = restaurants.find({ borough: { $in: ['Manhattan', 'Brooklyn'] }, cuisine: { $nin: ['American', 'Chinese'] }, 'grades.score': { $lt: 5 } });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6.
        // cursor = restaurants.find({ $and: [{ 'grades.score': 2 }, { 'grades.score': 6 }] });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan.
        // cursor = restaurants.find({ $and: [{ 'grades.score': 2 }, { 'grades.score': 6 }, { borough: 'Manhattan' }] });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
        // cursor = restaurants.find({
        //     $and: [{ 'grades.score': 2 }, { 'grades.score': 6 }, { borough: { $in: ['Manhattan', 'Brooklyn'] } }],
        // });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
        // cursor = restaurants.find({
        //     $and: [{ 'grades.score': 2 }, { 'grades.score': 6 }, { borough: { $in: ['Manhattan', 'Brooklyn'] } }, { cuisine: { $ne: 'American' } }],
        // });
        // await printResults(cursor);

        // Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
        // cursor = restaurants.find({
        //     $and: [{ 'grades.score': 2 }, { 'grades.score': 6 }, { borough: { $in: ['Manhattan', 'Brooklyn'] } }, { cuisine: { $nin: ['American', 'Chinese'] } }],
        // });
        // await printResults(cursor);

        // 48. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5.
        // cursor = restaurants.find({ grades: { $not: { $elemMatch: { score: { $lt: 5 } } } } });
        // await printResults(cursor);

        // 49. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan.
        // cursor = restaurants.find({ grades: { $not: { $elemMatch: { score: { $lt: 5 } } } }, borough: 'Manhattan' });
        // await printResults(cursor);

        // 50. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan or Brooklyn.
        // cursor = restaurants.find({ grades: { $not: { $elemMatch: { score: { $lt: 5 } } } }, borough: { $in: ['Manhattan', 'Brooklyn'] } });
        // await printResults(cursor);

        // ---------------------------------------------Aggregations-------------------------------------------------------

        // 51. Write a MongoDB query to find the average score for each restaurant.
        // pipeline = [{ $unwind: '$grades' }, { $group: { _id: '$name', averageScore: { $avg: '$grades.score' } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 52. Write a MongoDB query to find the highest score for each restaurant.
        // pipeline = [{ $unwind: '$grades' }, { $group: { _id: '$name', averageScore: { $max: '$grades.score' } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 53. Write a MongoDB query to find the lowest score for each restaurant.
        // pipeline = [{ $unwind: '$grades' }, { $group: { _id: '$name', averageScore: { $min: '$grades.score' } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 54. Write a MongoDB query to find the count of restaurants in each borough.
        // pipeline = [{ $group: { _id: '$borough', count: { $sum: 1 } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 55. Write a MongoDB query to find the count of restaurants for each cuisine.
        // pipeline = [{ $group: { _id: '$cuisine', count: { $sum: 1 } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 56. Write a MongoDB query to find the count of restaurants for each cuisine and borough.
        // pipeline = [{ $group: { _id: { cui: '$cuisine', bor: '$borough' }, count: { $sum: 1 } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 57. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine.
        // pipeline = [
        //     {
        //         $unwind: '$grades',
        //     },
        //     { $match: { 'grades.grade': 'A' } },
        //     { $group: { _id: '$cuisine', count: { $sum: 1 } } },
        // ];
        // await printAggregationResult(restaurants, pipeline);

        // 58. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each borough.
        // pipeline = [
        //     {
        //         $unwind: '$grades',
        //     },
        //     { $match: { 'grades.grade': 'A' } },
        //     { $group: { _id: '$borough', count: { $sum: 1 } } },
        // ];
        // await printAggregationResult(restaurants, pipeline);

        // 59. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine and borough.
        // pipeline = [{ $unwind: '$grades' }, { $match: { 'grades.grade': 'A' } }, { $group: { _id: { cuisine: '$cuisine', borough: '$borough' }, count: { $sum: 1 } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 60. Write a MongoDB query to find the number of restaurants that have been graded in each month of the year.
        // ???!!!

        // 61. Write a MongoDB query to find the average score for each cuisine.
        // pipeline = [{ $unwind: '$grades' }, { $group: { _id: '$cuisine', averageScore: { $avg: '$grades.score' } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 62. Write a MongoDB query to find the highest score for each cuisine.
        // pipeline = [{ $unwind: '$grades' }, { $group: { _id: '$cuisine', highestScore: { $max: '$grades.score' } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 63. Write a MongoDB query to find the lowest score for each cuisine.
        // pipeline = [{ $unwind: '$grades' }, { $group: { _id: '$cuisine', lowestScore: { $min: '$grades.score' } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 64. Write a MongoDB query to find the average score for each borough.
        // pipeline = [{ $unwind: '$grades' }, { $group: { _id: '$borough', avgScore: { $avg: '$grades.score' } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 65. Write a MongoDB query to find the highest score for each borough.
        // pipeline = [{ $unwind: '$grades' }, { $group: { _id: '$borough', highestScore: { $max: '$grades.score' } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 66. Write a MongoDB query to find the lowest score for each borough.
        // pipeline = [{ $unwind: '$grades' }, { $group: { _id: '$borough', lowestScore: { $min: '$grades.score' } } }];
        // await printAggregationResult(restaurants, pipeline);

        // 67. Write a MongoDB query to find the name and address of the restaurants that received a grade of 'A' on a specific date.

        // 68. Write a MongoDB query to find the name and address of the restaurants that received a grade of 'B' or 'C' on a specific date.

        // 69. Write a MongoDB query to find the name and address of the restaurants that have at least one 'A' grade and one 'B' grade.

        // 70. Write a MongoDB query to find the name and address of the restaurants that have at least one 'A' grade and no 'B' grades.

        // 71. Write a MongoDB query to find the name ,address and grades of the restaurants that have at least one 'A' grade and no 'C' grades.

        // 72. Write a MongoDB query to find the name, address, and grades of the restaurants that have at least one 'A' grade, no 'B' grades, and no 'C' grades.

        // 73. Write a MongoDB query to find the name and address of the restaurants that have the word 'coffee' in their name.

        // 74. Write a MongoDB query to find the name and address of the restaurants that have a zipcode that starts with '10'.

        // 75. Write a MongoDB query to find the name and address of the restaurants that have a cuisine that starts with the letter 'B'.

        // 76. Write a MongoDB query to find the name, address, and cuisine of the restaurants that have a cuisine that ends with the letter 'y'.

        // 77. Write a MongoDB query to find the name, address, and cuisine of the restaurants that have a cuisine that contains the word 'Pizza'.

        // 78. Write a MongoDB query to find the restaurants achieved highest average score.

        // 79. Write a MongoDB query to find all the restaurants with the highest number of "A" grades.

        // 80. Write a MongoDB query to find the cuisine type that is most likely to receive a "C" grade.

        // 81. Write a MongoDB query to find the restaurant that has the highest average score for thecuisine "Turkish".

        // 82. Write a MongoDB query to find the restaurants that achieved the highest total score.

        // Write a MongoDB query to find all the Chinese restaurants in Brooklyn.

        // Write a MongoDB query to find the restaurant with the most recent grade date.

        // Write a MongoDB query to find the top 5 restaurants with the highest average score for each cuisine type, along with their average scores.

        // Write a MongoDB query to find the top 5 restaurants in each borough with the highest number of "A" grades.

        // Write a MongoDB query to find the borough with the highest number of restaurants that have a grade of "A" and a score greater than or equal to 90.
    } catch (error) {
        console.dir(error);
    } finally {
        await client.close();
        process.exit();
    }
})();
