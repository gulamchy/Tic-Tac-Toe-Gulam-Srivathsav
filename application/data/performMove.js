

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const handlePostMoveNotification = require('./handlePostMoveNotification');


const performMove = async ({gameId, cell, cellValue, user}) => {
  console.log('Before constructing params:');
  console.log('gameId:', gameId);
  console.log('cell:', cell);
  console.log('cellValue:', cellValue);
  console.log('user:', user);
  // const params = {
  //   TableName: 'tic-tac-toe-game',
  //   Key: {
  //     gameId: gameId,
  //   },
  //   UpdateExpression: `SET ${cell} = :value, lastMoveBy = :user`,
  //   // ConditionExpression: `(user1 = :user OR user2 = :user) AND lastMoveBy <> :user AND ${cell} = :emptyCell`,
  //   ConditionExpression: `(user1 = :user OR user2 = :user) AND lastMoveBy <> :user`,
  //   ExpressionAttributeValues: {
  //     ':value': cellValue,
  //     ':user': user,
  //     // ':emptyCell': 0,
  //   },
  //   ReturnValues: 'ALL_NEW',
  // };
  
  const params = {
    TableName: 'tic-tac-toe-game',
    Key: { 
      gameId: gameId
    },
    UpdateExpression: `SET lastMoveBy = :user, ${cell} = :value`,
    ConditionExpression: `(user1 = :user OR user2 = :user) AND lastMoveBy <> :user AND ${cell} = :empty`,
    ExpressionAttributeValues: {
      ':user': user,
      ':value': cellValue,
      ':empty': 0,
    },
    ReturnValues: 'ALL_NEW'
  };
  console.log('cell value', [cell]);
  console.log('ExpressionAttributeValues:', params.ExpressionAttributeValues);
  console.log('ExpressionAttributeValues:', params.UpdateExpression);


  try {
    const result = await documentClient.update(params).promise();
    console.log('Move performed successfully:', result.Attributes);
    return result.Attributes; // Returns the updated item
  } catch (error) {
    console.log('Error performing move:', error);
    // Check if the error is due to the condition not being met
    if (error.code === 'ConditionalCheckFailedException') {
      console.log('Invalid move. The last move was not made by the specified user.');
    }
    throw error;
  }
};
module.exports = performMove;