

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const performMove = async (gameId, cell, cellValue, user) => {
 
  const params = {
    TableName: 'tic-tac-toe-game',
    Key: {
      gameId: gameId,
    },
    UpdateExpression: `SET ${cell} = :cellValue, lastMoveBy = :user`,
    // ConditionExpression: `(user1 = :user OR user2 = :user) AND lastMoveBy <> :user AND ${cell} > :value`,
    ConditionExpression: `(user1 = :user OR user2 = :user) AND lastMoveBy <> :user`,
    ExpressionAttributeValues: {
      ':cellValue': cellValue,
      ':user': user
    },
    ReturnValues: 'ALL_NEW',
  };

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


// Example usage:
const gameId = '5b5ee7d8'; // Replace with the actual game ID
const cell = 'a2'; // Replace with the actual cell where the move is made
const user = 'theseconduser'; // Replace with the actual user making the move
const cellValue = 2;

performMove(gameId, cell, cellValue, user);
